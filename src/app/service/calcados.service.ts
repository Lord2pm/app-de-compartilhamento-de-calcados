import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  docData,
  query,
  orderBy,
  Timestamp,
  CollectionReference,
  where,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Calcado {
  id?: string;
  descricao: string;
  tamanho: number;
  lado: 'esquerdo' | 'direito';
  criadoEm: Timestamp;
  userId: string;
}

export interface Interesse {
  id?: string;
  calcadoId: string;
  interessadoId: string;
  email: string;
  manifestadoEm: any;
}

export interface InteresseRecebido {
  descricao: string;
  tamanho: number;
  lado: string;
  interessadoEmail: string;
  manifestadoEm: Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class CalcadoService {
  private auth = inject(Auth);
  private calcadosRef: CollectionReference<Calcado>; // 🔧 corrigido aqui

  constructor(private firestore: Firestore) {
    this.calcadosRef = collection(
      this.firestore,
      'calcados'
    ) as CollectionReference<Calcado>;
  }

  listarCalcados(): Observable<Calcado[]> {
    const q = query(this.calcadosRef, orderBy('criadoEm', 'desc'));
    return collectionData(q, { idField: 'id' });
  }

  adicionarCalcado(
    calcado: Omit<Calcado, 'criadoEm' | 'userId'>
  ): Promise<any> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    return addDoc(this.calcadosRef, {
      ...calcado,
      userId: user.uid,
      criadoEm: Timestamp.now(),
    });
  }

  removerCalcado(id: string): Promise<void> {
    const ref = doc(this.firestore, `calcados/${id}`);
    return deleteDoc(ref);
  }

  obterCalcadoPorId(id: string): Observable<Calcado> {
    const ref = doc(this.firestore, `calcados/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Calcado>;
  }

  listarMeusCalcados(): Observable<Calcado[]> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const q = query(
          this.calcadosRef,
          where('userId', '==', user.uid),
          orderBy('criadoEm', 'desc')
        );
        return collectionData(q, { idField: 'id' });
      })
    );
  }

  async manifestarInteresse(calcadoId: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const interesse = {
      calcadoId,
      interessadoId: user.uid,
      email: user.email,
      manifestadoEm: Timestamp.now(),
    };

    const interessesRef = collection(this.firestore, 'interesses');
    return addDoc(interessesRef, interesse);
  }

  listarInteressesDoUsuario(): Observable<any[]> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user) return of([]);

        const interessesRef = collection(this.firestore, 'interesses');
        const q = query(interessesRef, where('interessadoId', '==', user.uid));

        return collectionData(q, { idField: 'id' }) as Observable<Interesse[]>;
      }),
      switchMap((interesses: Interesse[]) => {
        if (!interesses.length) return of([]);

        const calcadoRequests = interesses.map((interesse) => {
          const ref = doc(this.firestore, `calcados/${interesse.calcadoId}`);
          return getDoc(ref).then((snap) => {
            return snap.exists()
              ? {
                  id: snap.id,
                  ...snap.data(),
                  manifestadoEm: interesse.manifestadoEm,
                }
              : null;
          });
        });

        return combineLatest(calcadoRequests).pipe(
          map((calcados) => calcados.filter((c) => c !== null))
        );
      })
    );
  }

  listarInteressesRecebidos(): Observable<InteresseRecebido[]> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const calcadoRef = collection(this.firestore, 'calcados');
        const q = query(calcadoRef, where('userId', '==', user.uid));
        return collectionData(q, { idField: 'id' });
      }),
      switchMap((meusCalcados: any[]) => {
        if (meusCalcados.length === 0) return of([]);
        const interessesRef = collection(this.firestore, 'interesses');
        const observables = meusCalcados.map((calcado) => {
          const q = query(interessesRef, where('calcadoId', '==', calcado.id));
          return collectionData(q).pipe(
            map((interesses: any[]) =>
              interesses.map((interesse) => ({
                descricao: calcado.descricao,
                tamanho: calcado.tamanho,
                lado: calcado.lado,
                interessadoEmail: interesse.email,
                manifestadoEm: interesse.manifestadoEm,
              }))
            )
          );
        });
        return combineLatest(observables).pipe(
          map((resultados) => resultados.flat())
        );
      })
    );
  }
}

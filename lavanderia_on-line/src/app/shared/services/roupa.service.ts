import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Roupa } from '../models/roupa';

const LS_CHAVE: string = 'roupas';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {

  constructor() { }

  private getRoupasFromLocalStorage(): Roupa[] {
    const roupas = localStorage.getItem(LS_CHAVE);
    return roupas ? JSON.parse(roupas) : [];
  }

  private saveRoupasToLocalStorage(roupas: Roupa[]): void {
    localStorage.setItem(LS_CHAVE, JSON.stringify(roupas));
  }

  listarRoupas(): Observable<Roupa[]> {
    const roupas = this.getRoupasFromLocalStorage();
    return of(roupas);
  }

  removerRoupa(id: number): Observable<Roupa | null> {
    let roupas: Roupa[] = this.getRoupasFromLocalStorage();

    const index = roupas.findIndex(roupa => roupa.id === id);

    if (index !== -1) {
      roupas.splice(index, 1);
      this.saveRoupasToLocalStorage(roupas);
      return of(null); // Indica sucesso na remoção
    } else {
      return of(null); // Indica que o item não foi encontrado
    }
  }

  inserirRoupa(roupa: Roupa): Observable<Roupa> {
    let roupas: Roupa[] = this.getRoupasFromLocalStorage();

    // Simula a geração de um ID único (você pode ajustar conforme necessário)
    roupa.id = new Date().getTime();

    roupas.push(roupa);
    this.saveRoupasToLocalStorage(roupas);

    return of(roupa);
  }

  buscarPorId(id: number): Observable<Roupa | null> {
    const roupas: Roupa[] = this.getRoupasFromLocalStorage();
    const roupa = roupas.find(item => item.id === id);
    return of(roupa || null);
  }

  alterar(roupa: Roupa): Observable<Roupa | null> {
    let roupas: Roupa[] = this.getRoupasFromLocalStorage();

    const index = roupas.findIndex(item => item.id === roupa.id);

    if (index !== -1) {
      roupas[index] = roupa;
      this.saveRoupasToLocalStorage(roupas);
      return of(roupa);
    } else {
      return of(null); // Indica que o item não foi encontrado
    }
  }
}

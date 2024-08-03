import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatorioReceitaResponse } from '../../models/relatorios';
@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl = 'http://localhost:8080/api/relatorios/receita';

  constructor(private http: HttpClient) { }

  gerarRelatorio(dataInicio:String, dataFim: String): Observable<RelatorioReceitaResponse> {
    
      const params = `dataInicio=${dataInicio}&dataFim=${dataFim}`;
      return this.http.get<RelatorioReceitaResponse>(`${this.apiUrl}?${params}`);
    }
}
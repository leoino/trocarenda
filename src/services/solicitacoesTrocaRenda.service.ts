import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import {DadosSalvarSolicitacaoTrocaRenda, ParametroPlano, RetornoSalvarTrocaRenda, SolicitacaoTrocaRenda, UserData } from "../shared/types";
import { SimulacaoService } from "./simulacao.service";
import { UserDataService } from "./userdata.service";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json;charset=UTF-8',
    "Authorization": "Basic " + btoa("Adm_BackOffice_TrocaRenda:123456")
  })
}
@Injectable({
  providedIn: 'root'
})
export class SolicitacoesTrocaRendaService {
  constructor(private http: HttpClient, public simulacaoService: SimulacaoService) {}
  public solicitacao = signal<Partial<SolicitacaoTrocaRenda>>({});
  public novaSolicitacao = signal<DadosSalvarSolicitacaoTrocaRenda | null>(null);
  public idSolicitacao = signal<number>(0);
  public protocolo = signal('');

  getSolicitacaoTrocaRenda(codEmpresa: number, Registro: number) {
    this.http.get<SolicitacaoTrocaRenda>(environment.apiEndpoint + '/GetSolicitacaoTrocaRenda', { headers: { "Authorization": "Basic " + btoa("Adm_BackOffice_TrocaRenda:123456") }, params: {CodEmpresa: codEmpresa, Registro: Registro} }).subscribe(data => {
      this.solicitacao.update(() => data);
    });
  }

  salvarSolicitacaoTrocaRenda(solicitacao: DadosSalvarSolicitacaoTrocaRenda) {
    const body = JSON.stringify(solicitacao);
    this.http.post<RetornoSalvarTrocaRenda>(environment.apiEndpoint + '/SalvarTrocaRenda', body, httpOptions).subscribe(data => {

      if (data) {
        this.idSolicitacao.update(() => data.IdSolicitacao);
        this.protocolo.update(() => data.Protocolo);
        this.simulacaoService.concluido.update(() => true);
        this.simulacaoService.loading.update(() => false);
      }
    });
  }
}

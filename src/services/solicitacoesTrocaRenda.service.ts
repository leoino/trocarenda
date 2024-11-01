import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import {DadosSalvarSolicitacaoTrocaRenda, DadosSalvarSolicitacaoTrocaRendaV2, ParametroPlano, RetornoSalvarTrocaRenda, SolicitacaoTrocaRenda, UserData } from "../shared/types";
import { SimulacaoService } from "./simulacao.service";
import { UserDataService } from "./userdata.service";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json;charset=UTF-8',
    'X-VivestCenter-Key': environment.key
  })
}
@Injectable({
  providedIn: 'root'
})
export class SolicitacoesTrocaRendaService {
  constructor(private http: HttpClient, public simulacaoService: SimulacaoService) {}
  public solicitacao = signal<Partial<SolicitacaoTrocaRenda>>({});
  public novaSolicitacao = signal<DadosSalvarSolicitacaoTrocaRendaV2 | null>(null);
  public idSolicitacao = signal<number>(0);
  public protocolo = signal('');

  getSolicitacaoTrocaRenda(codEmpresa: number, Registro: number) {
    this.http.get<SolicitacaoTrocaRenda>(environment.apiEndpoint + '/GetSolicitacaoTrocaRenda', { headers: { "X-VivestCenter-Key": environment.key }, params: {CodEmpresa: codEmpresa, Registro: Registro} }).subscribe(data => {
      this.solicitacao.update(() => data);
    });
  }

  salvarSolicitacaoTrocaRenda(solicitacao: DadosSalvarSolicitacaoTrocaRendaV2, token: string) {
    const body = JSON.stringify(solicitacao);
    this.http.post<RetornoSalvarTrocaRenda>(environment.apiEndpoint + '/SalvarTrocaRendaV2', body, { headers: {'Content-Type':'application/json;charset=UTF-8', "X-VivestCenter-Key": environment.key }, params: {'token': token}}).subscribe(data => {

      if (data) {
        this.idSolicitacao.update(() => data.IdSolicitacao);
        this.protocolo.update(() => data.Protocolo);
        this.simulacaoService.concluido.update(() => true);
        this.simulacaoService.loading.update(() => false);
      }
    });
  }
}

import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import {ParametroPlano, TextoAjuda, UserData } from "../shared/types";

@Injectable({
  providedIn: 'root'
})
export class TextosAjudaService {
  constructor(private http: HttpClient) {}
  public listaTextosAjuda = signal<Partial<TextoAjuda>[]>([{}]);

  getTextosAjuda(codPlano: number) {
    this.http.get<TextoAjuda[]>(environment.apiEndpoint + '/GetMensagensAjudaTrocaRenda', { headers: { "Authorization": "Basic " + btoa("Adm_BackOffice_TrocaRenda:123456") }, params: {CodPlano: codPlano} }).subscribe(data => {
      this.listaTextosAjuda.update(() => data);
    });
  }
}

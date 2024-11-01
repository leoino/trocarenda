import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TextoAjuda } from "../shared/types";

@Injectable({
  providedIn: 'root'
})
export class TextosAjudaService {
  constructor(private http: HttpClient) {}
  public listaTextosAjuda = signal<Partial<TextoAjuda>[]>([{}]);

  getTextosAjuda(codPlano: number) {
    this.http.get<TextoAjuda[]>(environment.apiEndpoint + '/GetMensagensAjudaTrocaRenda', { headers: { "X-VivestCenter-Key": environment.key }, params: {CodPlano: codPlano} }).subscribe(data => {
      this.listaTextosAjuda.update(() => data);
    });
  }
}

import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import {ParametroPlano, UserData } from "../shared/types";

@Injectable({
  providedIn: 'root'
})
export class ParametroPlanoService {
  constructor(private http: HttpClient) {}
  public parametroPlano = signal<ParametroPlano[]>([]);

  getParametroPlano(codPlano: number) {
    this.http.get<ParametroPlano[]>(environment.apiEndpoint + '/GetPlanoParametros', { headers: { "X-VivestCenter-Key": environment.key }, params: {CodPlano: codPlano}}).subscribe(data => {
      this.parametroPlano.update(() => data);
    });
  }
}

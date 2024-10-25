import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TipoRendaService {
  public tipoRenda = signal(0);

  getCurrentTipoRenda() {
    return this.tipoRenda;
  }

  setTipoRenda(tipoNovo: number) {
    this.tipoRenda.update(() => tipoNovo);
    return this.tipoRenda;
  }
}

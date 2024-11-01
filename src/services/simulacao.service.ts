import { Injectable, signal } from "@angular/core";
import { TipoRendaService } from "./tipoRenda.service";
import { CurrencyPipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SimulacaoService {
  constructor(private tipoRendaService: TipoRendaService, private currency: CurrencyPipe) {}

  public parametroRenda = signal(0);
  public rendaReaisSimulado = signal(0);
  public rendaReaisFormatado = signal('');
  public rendaReaisValido = signal(false);
  public simulado = signal(false);
  public confirmando = signal(false);
  public concluido = signal(false);
  public loading = signal(false);
  getCurrentParametroRenda() {
    return this.parametroRenda;
  }

  setParametroRenda(parametroNovo: number, saldo: number) {
    this.parametroRenda.update(() => parametroNovo);
    this.calcularValorReaisSimulado(saldo);
    return this.parametroRenda;
  }

  calcularValorReaisSimulado(saldo: number) {
    if (+this.tipoRendaService.tipoRenda() == 5) {
      this.rendaReaisSimulado.update(() => this.parametroRenda());
      this.converterValor(this.parametroRenda());
      return;
    }
    if (+this.tipoRendaService.tipoRenda() == 6) {
      const valor = saldo * (this.parametroRenda() / 100);
      this.rendaReaisSimulado.update(() => valor);
      this.converterValor(this.rendaReaisSimulado());
      return;
    }
    if (+this.tipoRendaService.tipoRenda() == 7) {
      const valor = saldo / (this.parametroRenda() * 13);
      this.rendaReaisSimulado.update(() => valor);
      this.converterValor(this.rendaReaisSimulado());
      return;
    }
    return 0;
  }

  getValorReaisSimulado() {
    return this.rendaReaisSimulado;
  }

  converterValor(valor: number) {
    const e = this.currency.transform(valor, 'BRL', 'symbol', '1.2-2', 'pt-BR') as string;
    this.rendaReaisFormatado.update(() => e);
  }

  resetarValores() {
    this.rendaReaisSimulado.update(() => 0);
    this.rendaReaisFormatado.update(() => '');
    this.rendaReaisValido.update(() => false);
  }
}

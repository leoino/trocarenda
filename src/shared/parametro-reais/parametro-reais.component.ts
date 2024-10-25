import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SimulacaoService } from '../../services/simulacao.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParametroPlanoService } from '../../services/parametroPlano.service';
import { UserDataService } from '../../services/userdata.service';
import moment from 'moment';
@Component({
  selector: 'app-parametro-reais',
  standalone: true,
  imports: [CurrencyMaskModule, CommonModule, FormsModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './parametro-reais.component.html',
  styleUrl: './parametro-reais.component.scss',
  providers: [provideNgxMask()]
})
export class ParametroReaisComponent {
  constructor(public simulacaoService: SimulacaoService, public userDataService: UserDataService, public parametroPlanoService: ParametroPlanoService) {}
  @ViewChild('inputreais', { static: true }) input!: HTMLInputElement;
  minValue!: number;
  maxValue!: number;
  reais = new FormControl('');
  rulesDIB = [32, 17, 22, 18, 30, 39, 5, 16];

  ngOnInit() {
    if(this.userDataService.userData() && this.parametroPlanoService.parametroPlano().length > 0) {
      this.minValue = this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 5)[0].ValorMinimoRecebimento;
      // valor mínimo inicial
      if(this.simulacaoService.simulado()) {
        // Já simulou, pegar valores simulados
        this.reais.setValue(this.simulacaoService.parametroRenda().toString());
      } else {
        if(this.userDataService.userData()?.TipoRenda == "Renda em Valor Constante (Em reais)") {
          this.reais.setValue(this.userDataService.userData()!.ParametroRendaAtual.toString());
          this.simulacaoService.setParametroRenda(this.userDataService.userData()!.ParametroRendaAtual, this.userDataService.userData()?.SaldoAtuReais!);
        } else {
          this.reais.setValue(this.minValue.toString());
          this.simulacaoService.setParametroRenda(this.minValue, this.userDataService.userData()?.SaldoAtuReais!);
        }
      }

      // exibe resultado com valor inicial
      this.simulacaoService.rendaReaisValido.update(() => true);

      if (this.rulesDIB.includes(this.userDataService.userData()?.NumPlbnf!)) {
        if (moment(this.userDataService.userData()?.DatInicioBfpart).add(48, 'month') < moment()) {
            // aplicar validadores no input apenas mínimo e máximo saldo
            this.maxValue = this.userDataService.userData()?.SaldoAtuReais as number;
            this.reais.setValidators([Validators.min(this.minValue), Validators.max(this.maxValue)]);
        } else {
          // valor máximo permitido
          this.maxValue = this.userDataService.userData()?.SaldoAtuReais as number * (this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 5)[0].LimiteMaximoSaldo / 100);

          // aplicar validadores no input
          this.reais.setValidators([Validators.min(this.minValue), Validators.max(this.maxValue)]);
        }

      } else {
      // valor máximo permitido
      this.maxValue = this.userDataService.userData()?.SaldoAtuReais as number * (this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 5)[0].LimiteMaximoSaldo / 100);

      // aplicar validadores no input
      this.reais.setValidators([Validators.min(this.minValue), Validators.max(this.maxValue)]);
      }


    }
  }

  changeValue(newValue: Event) {
    if(+newValue == 0 || newValue == null) {
      this.reais.setErrors(null);
      this.simulacaoService.rendaReaisValido.update(() => true);
    }
    if (this.reais.valid) {
      this.simulacaoService.setParametroRenda(+newValue, this.userDataService.userData()?.SaldoAtuReais!);
      this.simulacaoService.rendaReaisValido.update(() => true);
    } else {
      this.simulacaoService.rendaReaisValido.update(() => false);
    }
  }
}

import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { SimulacaoService } from '../../services/simulacao.service';
import { UserDataService } from '../../services/userdata.service';
import { ParametroPlanoService } from '../../services/parametroPlano.service';

@Component({
  selector: 'app-parametro-percentual',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './parametro-percentual.component.html',
  styleUrl: './parametro-percentual.component.scss'
})
export class ParametroPercentualComponent {
  constructor(public simulacaoService: SimulacaoService, public userDataService: UserDataService, public parametroPlanoService: ParametroPlanoService) {}

  value: number = 0;
  options: Options = {
    floor: 0.1,
    ceil: 2,
    step: 0.01,
    showSelectionBar: true,
    translate: (value: number): string => {
      return value + ' %';
    }
  };

  ngOnInit() {
    if(this.userDataService.userData() && this.parametroPlanoService.parametroPlano()) {
      this.options.floor = this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 6)[0].ParamMinimo;
      this.options.ceil = this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 6)[0].ParamMaximo;
      if(this.userDataService.userData()?.TipoRenda == "Renda em Percentual do Saldo") {
        this.value = this.userDataService.userData()?.ParametroRendaAtual as number;
        this.simulacaoService.setParametroRenda(this.value, this.userDataService.userData()?.SaldoAtuReais!);
        this.simulacaoService.rendaReaisValido.update(() => true);
      } else {
        this.value = this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 6)[0].ParamMinimo;
        this.simulacaoService.setParametroRenda(this.value, this.userDataService.userData()?.SaldoAtuReais!);
        this.simulacaoService.rendaReaisValido.update(() => true);
      }
    }
  }

  changeValue(e: Event) {
    const el = e.currentTarget as HTMLInputElement;
    this.value = +el.value;
    this.simulacaoService.setParametroRenda(this.value, this.userDataService.userData()?.SaldoAtuReais!);
    this.simulacaoService.rendaReaisValido.update(() => true);
  }

  changeSlider(value: number) {
    this.simulacaoService.setParametroRenda(value, this.userDataService.userData()?.SaldoAtuReais!);
    this.simulacaoService.rendaReaisValido.update(() => true);
  }
}

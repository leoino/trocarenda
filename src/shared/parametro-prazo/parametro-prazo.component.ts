import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { SimulacaoService } from '../../services/simulacao.service';
import { UserDataService } from '../../services/userdata.service';
import { ParametroPlanoService } from '../../services/parametroPlano.service';

@Component({
  selector: 'app-parametro-prazo',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './parametro-prazo.component.html',
  styleUrl: './parametro-prazo.component.scss'
})
export class ParametroPrazoComponent {
  constructor(public simulacaoService: SimulacaoService, public userDataService: UserDataService, public parametroPlanoService: ParametroPlanoService) {}

  value: number = 0;
  options: Options = {
    floor: 5,
    ceil: 35,
    step: 1,
    showSelectionBar: true,
    translate: (value: number): string => {
      return value + ' anos';
    }
  };

  ngOnInit() {
    if(this.userDataService.userData() && this.parametroPlanoService.parametroPlano()) {
      if(this.userDataService.userData()?.TipoRenda == "Renda em Prazo Certo") {
        this.value = (this.userDataService.userData()?.ParametroRendaAtual as number)/13;
        this.simulacaoService.setParametroRenda(this.value, this.userDataService.userData()?.SaldoAtuReais!);
        this.simulacaoService.rendaReaisValido.update(() => true);
      } else {
        this.value = this.parametroPlanoService.parametroPlano().filter(a => a.TipoRenda == 7)[0].ParamMinimo;
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

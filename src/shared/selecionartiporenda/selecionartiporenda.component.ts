import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { TipoRendaService } from '../../services/tipoRenda.service';
import { SimulacaoService } from '../../services/simulacao.service';
import { ParametroPlanoService } from '../../services/parametroPlano.service';
import { UserDataService } from '../../services/userdata.service';

@Component({
  selector: 'app-selecionartiporenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionartiporenda.component.html',
  styleUrl: './selecionartiporenda.component.scss'
})
export class SelecionartiporendaComponent {

  constructor(private tipoRendaService: TipoRendaService, private simulacaoService: SimulacaoService, private parametroPlanoService: ParametroPlanoService, private userDataService: UserDataService) {
    effect(()=> {
      if (this.tipoRendaService.tipoRenda() > 0 && !this.simulacaoService.confirmando() && this.activeTab == 0) {
        this.activeTab = this.tipoRendaService.tipoRenda();
      }
      if(this.tipoRendaService.tipoRenda() == 0 && !this.simulacaoService.confirmando() && this.activeTab > 0) {
        this.activeTab = 0;
      }
    });
  }
  activeTab = 0;
  tiposPermitidos: number[] = [];
  rulesTipoRenda = [5, 16, 39];

  ngOnInit() {
    if(this.parametroPlanoService.parametroPlano().length > 0) {
      this.parametroPlanoService.parametroPlano().forEach(parametro => {
        if(parametro.IsEnabled) {
          if (parametro.TipoRenda == 6) {
            if(this.rulesTipoRenda.includes(this.userDataService.userData()?.NumPlbnf!)) {
              if(this.userDataService.userData()?.TipoRenda == 'Renda em Percentual do Saldo') {
                this.tiposPermitidos.push(parametro.TipoRenda);
              }
            } else {
              this.tiposPermitidos.push(parametro.TipoRenda);
            }
          } else {
            this.tiposPermitidos.push(parametro.TipoRenda);
          }

        }
      });
    }
  }

  setTab(codTab: number) {
    this.activeTab = codTab;
    this.tipoRendaService.setTipoRenda(codTab);
    this.simulacaoService.resetarValores();
  }
}

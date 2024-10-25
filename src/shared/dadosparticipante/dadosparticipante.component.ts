import { Component } from '@angular/core';
import { UserDataService } from '../../services/userdata.service';
import { UserData } from '../types';
import { ParametroPlanoService } from '../../services/parametroPlano.service';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dadosparticipante',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './dadosparticipante.component.html',
  styleUrl: './dadosparticipante.component.scss'
})
export class DadosparticipanteComponent {
  constructor(public userDataService: UserDataService) {}
  dadosPosicaoAtual: UserData | null = null;

  ngOnInit() {
    if(this.userDataService.userCPF()) {
      this.userDataService.getUserData(this.userDataService.userCPF());
    }
  }
}

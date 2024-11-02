import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DadosparticipanteComponent } from '../shared/dadosparticipante/dadosparticipante.component';
import { SimuladorComponent } from '../shared/simulador/simulador.component';
import {} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserDataService } from '../services/userdata.service';
import { DatePipe } from '@angular/common';
import { ConfirmacaoComponent } from '../shared/confirmacao/confirmacao.component';
import { SimulacaoService } from '../services/simulacao.service';
import { SucessoComponent } from '../shared/sucesso/sucesso.component';
import { AlteracaoEfetuadaComponent } from '../shared/alteracao-efetuada/alteracao-efetuada.component';
import { SolicitacoesTrocaRendaService } from '../services/solicitacoesTrocaRenda.service';
import { CreateTokenComponent } from '../shared/create-token/create-token.component';
import { ParametroPlanoService } from '../services/parametroPlano.service';
import { TextosAjudaService } from '../services/textosAjuda.service';
import { TipoRendaService } from '../services/tipoRenda.service';
import { TokenService } from '../services/token.service';
import { SemDadosComponent } from '../shared/sem-dados/sem-dados.component';

interface UserIdJwtPayload extends JwtPayload {
  CPF: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DadosparticipanteComponent, SimuladorComponent, DatePipe,
    RouterModule, ConfirmacaoComponent, SucessoComponent, AlteracaoEfetuadaComponent, SemDadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private route: ActivatedRoute,private router: Router, public userDataService: UserDataService,
    public simulacaoService: SimulacaoService, public solicitacaoTrocaRendaService: SolicitacoesTrocaRendaService, private parametroPlanoService: ParametroPlanoService,
    private textosAjudaService: TextosAjudaService, private tipoRendaService: TipoRendaService) {}
  title = 'trocarenda';
  token = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if(this.token) {
        this.userDataService.userToken.update(() => this.token!);
        this.userDataService.getUserData(this.userDataService.userToken());
      }
    });
  }

  sair() {
    this.parametroPlanoService.parametroPlano.update(() => []);
    this.simulacaoService.resetarValores();
    this.solicitacaoTrocaRendaService.solicitacao.set({});
    this.solicitacaoTrocaRendaService.novaSolicitacao.update(() => null);
    this.solicitacaoTrocaRendaService.idSolicitacao.update(() => 0);
    this.textosAjudaService.listaTextosAjuda.update(() => []);
    this.tipoRendaService.tipoRenda.update(() => 0);
    this.token = null;
    this.userDataService.userCPF.update(() => '');
    this.userDataService.userData.update(() => null);
    this.router.navigate(['/']);
  }
}

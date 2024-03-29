import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioCredentials } from '../model/UsuarioCredentials';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();
  usuarioCredentials: UsuarioCredentials = new UsuarioCredentials();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  login(event: any) {
    this.auth.login(this.usuarioLogin).subscribe({
      next: (resp: UsuarioCredentials) => {
        this.usuarioCredentials = resp;
        environment.token = this.usuarioCredentials.basicToken;
        environment.id = this.usuarioCredentials.id;
        environment.nome = this.usuarioCredentials.nome;
        environment.foto = this.usuarioCredentials.foto;
        environment.tipo = this.usuarioCredentials.tipo;

        this.auth.getUsuarioInfo();

        this.router.navigate(['/inicio']);
      },
      error: (erro) => {
        if (erro.status == 400) {
          alert('Usuário ou senha inválidos!');
        }
      },
    });
  }
}

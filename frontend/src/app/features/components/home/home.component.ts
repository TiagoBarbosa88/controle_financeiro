import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Dados de login
  loginData = {
    email: '',
    password: '',
  };

  // Dados de cadastro
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onLogin() {
    console.log('Login:', this.loginData);
    // Adicione lógica para autenticação
  }

  onRegister() {
    console.log('Cadastro:', this.registerData);
    // Adicione lógica para registro
  }
}

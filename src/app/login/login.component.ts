import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public recuerdame: boolean = false;
  public email: string; 
  public auth2: any;

  constructor(
    public router: Router,
    private titulo_navegador: Title,
    private _serviceUsuario: UsuarioService) { 

    
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.titulo_navegador.setTitle('Cloud H & S | Login');
    this.email = localStorage.getItem('email') || '';

    if(this.email.length > 0)
    this.recuerdame = true;
  }

  googleInit(){

    gapi.load('auth2', () =>{
      this.auth2 = gapi.auth2.init({
        client_id: '774878914879-162j2ho78134oomr08sgljn9gho0ov1u.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ){

    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      //console.log(token);
      this._serviceUsuario.loginGoogle( token )
                  .subscribe( resp => {
                    //console.log(resp);
                    //this.router.navigate(['/dashboard']);
                    window.location.href = '#/dashboard';
                  });
    });

  }

  ingresar(forma: NgForm){

    //console.log(forma.valid);
    //console.log(forma.value);
    if(!forma.valid)
    return;

    let usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._serviceUsuario.login(usuario, forma.value.recuerdame)
                        .subscribe( resp => this.router.navigate(['/dashboard']));
    //this.router.navigate(['/dashboard']);
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService : LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if ( this.loginForm.invalid )  {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { username, password } = this.loginForm.value; //desestructuracion del objecto form


    this.loginService.verificarLogin(username, password).subscribe({
      next: (resp) => {
        const { user } = resp;
        if (user != null && user.codUsuario > 0 ) {

          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(["./polla/tournament"]);

        } else {
          //this.hayError = true;
        }
      },
      error: (err) => {
        if (err.status === 400) {
          console.log("error de credenciales");
        }
      },
    });

  }
}

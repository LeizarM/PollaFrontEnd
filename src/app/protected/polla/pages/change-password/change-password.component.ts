import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PollaService } from '../../services/polla.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  codUsuario: number = 0 ;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';


  constructor(
    private fb: FormBuilder,
    private pollaService: PollaService,
    private route: ActivatedRoute
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const codUsuario = user.codUsuario;

      this.codUsuario = codUsuario;
    }

  }

  ngOnInit(): void {

  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      this.pollaService.verifyCurrentPassword(this.codUsuario, currentPassword).subscribe({
        next: (isValid) => {
          console.log("is Valid es = ", isValid);
          if (isValid) {
            this.pollaService.changePassword(this.codUsuario, newPassword).subscribe({
              next: (response) => {
                this.showAlert('Contraseña cambiada con éxito', 'success');
                this.changePasswordForm.reset();
              },
              error: (err) => {
                this.showAlert('Error al cambiar la contraseña: ' + err.message, 'error');
              }
            });
          } else {
            this.showAlert('La contraseña actual es incorrecta', 'error');
          }
        },
        error: (err) => {
          this.showAlert('Error al verificar la contraseña actual: ' + err.message, 'error');
        }
      });
    }
  }




  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }
}

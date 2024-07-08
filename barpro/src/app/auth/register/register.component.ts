import { ILoginData } from './../../models/i-login-data';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/i-user';
import { IBarman } from '../../models/i-barman';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      isBarman: [false],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      city: ['', Validators.required],
      experienceYears: [''],
      description: ['']
    });

    this.registerForm.get('isBarman')?.valueChanges.subscribe(value => {
      if (value) {
        this.registerForm.get('experienceYears')?.setValidators(Validators.required);
        this.registerForm.get('description')?.setValidators(Validators.required);
      } else {
        this.registerForm.get('experienceYears')?.clearValidators();
        this.registerForm.get('description')?.clearValidators();
      }
      this.registerForm.get('experienceYears')?.updateValueAndValidity();
      this.registerForm.get('description')?.updateValueAndValidity();
    });
  }

  register() {
    let loginData: ILoginData;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.isBarman) {
      const registerBarmanData: Partial<IBarman> = {
        ...this.registerForm.value,
        roles: [{ roleType: 'BARMAN' }]
      };

      this.authSvc.registerBarman(registerBarmanData).subscribe(
        data => {
          Swal.fire({
            title: 'Registrato!',
            text: 'Registrazione completata con successo.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          loginData = {
            username: registerBarmanData.username,
            password: registerBarmanData.password
          }
          this.authSvc.login(loginData).subscribe()
        },
        error => {
          Swal.fire('Errore!', 'Registrazione fallita. Riprova più tardi.', 'error');
          console.error('Barman registration failed', error);
        }
      );
    } else {
      const registerUserData: Partial<IUser> = {
        ...this.registerForm.value,
        roles: [{ roleType: 'USER' }]
      };

      this.authSvc.registerUser(registerUserData).subscribe(
        data => {
          Swal.fire({
            title: 'Registrato!',
            text: 'Registrazione completata con successo.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          loginData = {
            username: registerUserData.username,
            password: registerUserData.password
          }
          this.authSvc.login(loginData).subscribe()
        },
        error => {
          Swal.fire('Errore!', 'Registrazione fallita. Riprova più tardi.', 'error');
          console.error('User registration failed', error);
        }
      );
    }
  }
}

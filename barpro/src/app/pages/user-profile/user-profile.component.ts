import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user-profile/user.service';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../models/i-user';
import Swal from 'sweetalert2';
import { faEnvelope, faCity, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../main-components/loader/loader.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: IUser | null = null;
  avatarUrl: string | null = null;
  editForm: FormGroup;
  mail = faEnvelope
  city = faCity
  username = faUser

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private laoder: LoaderService
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      password: [''] // Password not required
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();

  }

  loadUserProfile(): void {
    const accessData = JSON.parse(localStorage.getItem('accessData') || '{}');
    const username = accessData.userResponse?.user?.username;

    if (username) {
      this.userService.getById(accessData.userResponse.user.id).subscribe(data => {
        this.user = data;

        if (this.user.avatar) this.loadAvatar(username);
      });
    }
  }

  loadAvatar(username: string): void {
    this.userService.getUserAvatar(username).subscribe(url => {
      this.avatarUrl = url;
      this.laoder.hideLoading()
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.laoder.showLoading()
      this.updateAvatar(file);
    }
  }

  updateAvatar(file: File): void {
    if (this.user) {
      this.userService.updateAvatar(this.user.username, file).subscribe(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Avatar aggiornato!",
          showConfirmButton: false,
          timer: 1500
        });
        this.loadAvatar(this.user!.username);
      }, error => {
        Swal.fire('Errore!', 'Si è verificato un errore durante l\'aggiornamento dell\'avatar.', 'error');
      });
    }
  }

  openEditModal(content: any): void {
    if (this.user) {
      this.editForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        city: this.user.city,
        password: '' // Leave password empty and not required
      });
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  updateUser(modal: any): void {
    if (this.user && this.editForm.valid) {
      const updatedUser: Partial<IUser> = {
        username: this.user.username,
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        city: this.editForm.value.city,
        password: '0' // Only include password if provided
      };

      if (this.editForm.value.password) {
        updatedUser.password = this.editForm.value.password;
      }



      this.userService.updateUser(this.user.id, updatedUser).subscribe(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "I tuoi dati sono stati aggiornati!",
          showConfirmButton: false,
          timer: 1500
        });        this.loadUserProfile();
        modal.close();
      }, error => {
        Swal.fire('Errore!', 'Si è verificato un errore durante l\'aggiornamento dei dati.', 'error');
      });
    }
  }

  deleteAvatar(): void {
    if (this.user) {
      this.userService.updateAvatar(this.user.username, new File([], "")).subscribe(() => {
        Swal.fire('Eliminato!', 'L\'avatar è stato eliminato con successo.', 'success');
        this.avatarUrl = null;
      }, error => {
        Swal.fire('Errore!', 'Si è verificato un errore durante l\'eliminazione dell\'avatar.', 'error');
      });
    }
  }
}

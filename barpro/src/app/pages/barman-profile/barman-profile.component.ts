import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarmanService } from '../barman/barman.service';
import { AuthService } from '../../auth/auth.service';
import { IBarman } from '../../models/i-barman';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barman-profile',
  templateUrl: './barman-profile.component.html',
  styleUrls: ['./barman-profile.component.scss']
})
export class BarmanProfileComponent implements OnInit {
  barman: IBarman | null = null;
  avatarUrl: string | null = null;
  editForm: FormGroup;

  constructor(
    private barmanService: BarmanService,
    private authService: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      password: [''],
      description: ['', Validators.required],
      experienceYears: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBarmanProfile();
  }

  loadBarmanProfile(): void {
    const accessData = JSON.parse(localStorage.getItem('accessData') || '{}');
    const username = accessData.barmanResponse?.barman?.username;

    if (username) {
      this.barmanService.getById(accessData.barmanResponse.barman.id).subscribe(data => {
        this.barman = data;
        if (this.barman.avatar) this.loadAvatar(username);
      });
    }
  }

  loadAvatar(username: string): void {
    this.barmanService.getUserAvatar(username).subscribe(url => {
      this.avatarUrl = url;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.updateAvatar(file);
    }
  }

  updateAvatar(file: File): void {
    if (this.barman) {
      this.barmanService.updateAvatar(this.barman.username, file).subscribe(() => {
        Swal.fire('Aggiornato!', 'L\'avatar è stato aggiornato con successo.', 'success');
        this.loadAvatar(this.barman!.username);
      }, error => {
        Swal.fire('Errore!', 'Si è verificato un errore durante l\'aggiornamento dell\'avatar.', 'error');
      });
    }
  }

  openEditModal(content: any): void {
    if (this.barman) {
      this.editForm.patchValue({
        firstName: this.barman.firstName,
        lastName: this.barman.lastName,
        email: this.barman.email,
        city: this.barman.city,
        password: '', // Leave password empty and not required
        description: this.barman.description,
        experienceYears: this.barman.experienceYears
      });
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  updateBarman(modal: any): void {
    if (this.barman && this.editForm.valid) {
      const updatedBarman: Partial<IBarman> = {
        username: this.barman.username,
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        city: this.editForm.value.city,
        password: '0',
        description: this.editForm.value.description,
        experienceYears: this.editForm.value.experienceYears
      };

      if (this.editForm.value.password) {
        updatedBarman.password = this.editForm.value.password;
      }



      this.barmanService.updateBarman(this.barman.id, updatedBarman).subscribe(() => {
        Swal.fire('Modificato!', 'I dati del barman sono stati aggiornati con successo.', 'success');
        this.loadBarmanProfile();
        modal.close();
      }, error => {
        Swal.fire('Errore!', 'Si è verificato un errore durante l\'aggiornamento dei dati.', 'error');
      });
    }
  }

  deleteAvatar(): void {
    if (this.barman) {
      this.barmanService.updateAvatar(this.barman.username, new File([], "")).subscribe(() => {
        Swal.fire('Eliminato!', 'L\'avatar è stato eliminato con successo.', 'success');
        this.avatarUrl = null;
      }, error => {
        Swal.fire('Errore!', 'Si è verificato un errore durante l\'eliminazione dell\'avatar.', 'error');
      });
    }
  }
}

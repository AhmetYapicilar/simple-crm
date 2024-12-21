import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule ,MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatButtonModule, MatProgressBarModule ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent implements OnInit {

  user: User = new User();
  birthDate?: Date;
  loading = false;

  constructor(private firestore: Firestore, private dialog: MatDialogRef<DialogAddUserComponent>){

  }

  ngOnInit(): void {
    
  }

  async saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate?.getTime();
    console.log(this.user);
    this.user.toJSON();

    const userRef = await addDoc(collection(this.firestore, 'users'), {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city,
    });
    this.closeDialog();
  }

  closeDialog(){
    this.dialog.close();
    this.loading = false;
  }

}

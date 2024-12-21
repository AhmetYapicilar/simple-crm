import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { Firestore, getDocs, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ FormsModule ,CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  users: any = [];
  private unsubscribe: (() => void) | null = null; // Variable für das Beenden des Abonnements
  user: User = new User();

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router){}

  ngOnInit(): void {
    this.subscribeToUsers();
  }

  subscribeToUsers() {
    const usersCollection = collection(this.firestore, 'users');
    this.unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      this.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(this.users);
    }, (error) => {
      console.error('Error fetching real-time updates: ', error);
    });
  }

  showUserDetail(clickedUser: User){
    this.router.navigateByUrl('/user/' + clickedUser.id);
  }

  ngOnDestroy(): void {
    // Abonnements beenden, um Speicherlecks zu vermeiden
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent)
  }

}

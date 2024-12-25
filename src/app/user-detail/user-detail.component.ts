import { Component, OnInit } from '@angular/core';
import { Firestore, doc, collection, getDoc } from '@angular/fire/firestore';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  userId: any = 0;  
  user: User = new User;

  constructor(private route:ActivatedRoute, private firestore: Firestore ){

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    this.getUser();
  }

  async getUser(){
    try {
      // Referenz zum spezifischen Benutzer-Dokument erstellen
      const userDocRef = doc(this.firestore, 'users', this.userId);
  
      // Firestore-Dokument abrufen
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        // Firestore-Dokumentdaten in User-Objekt umwandeln
        this.user = new User(userDoc.data());
        console.log(this.user);
      } else {
        console.error('User not found!');
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }
}

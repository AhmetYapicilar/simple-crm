import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-3b8db","appId":"1:838285790657:web:79ea1f9335108cd317b340","storageBucket":"simple-crm-3b8db.firebasestorage.app","apiKey":"AIzaSyBtAnpwooNueQFS2xUInYIe4qmU3EPNF54","authDomain":"simple-crm-3b8db.firebaseapp.com","messagingSenderId":"838285790657"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

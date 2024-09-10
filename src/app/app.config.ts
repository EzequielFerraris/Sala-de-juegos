import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({apiKey: "AIzaSyABPOCdGBEobwP20rG9X3zXDGlCFS71BBs",
    authDomain: "prueba1-7bc74.firebaseapp.com",
    projectId: "prueba1-7bc74",
    storageBucket: "prueba1-7bc74.appspot.com",
    messagingSenderId: "965140201922",
    appId: "1:965140201922:web:40766e37f5d445e6e7565b"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

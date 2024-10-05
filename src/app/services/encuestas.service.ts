import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { setDoc, collection, Firestore, doc, getDoc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(public auth: Auth,
              private firestore: Firestore) { }

  async guardar_encuesta(datos : object)
  {
    if(this.auth.currentUser?.email)
    {
      console.log(datos);

      const docRef = doc(this.firestore, 'encuestas', this.auth.currentUser?.uid);
      const snapshot = await getDoc(docRef);

      if(!snapshot.exists()) //NO HAY UN REGISTRO PREVIO
      {
        await setDoc(docRef, datos)
      }
      else //HAY UN REGISTRO PREVIO Y SOLO HAY QUE ACTUALIZAR EL EXISTENTE
      {
        await setDoc(docRef, datos, {merge: true})
      }
    }
    else
    {
      console.log("No usuario");
    }
    
  }

  obtener_encuestas()
  {  
    let col = collection(this.firestore, 'encuestas');
    return col;    
  }
}

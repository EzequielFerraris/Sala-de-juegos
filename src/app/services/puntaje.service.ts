import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { setDoc, collection, Firestore, query, where, doc, getDoc, increment, addDoc, limit, orderBy } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(public auth: Auth,
              private firestore: Firestore) {
    
  }

  ngOnInit()
  {
  }

  async guardar_puntaje(ptos : number, juegos : Array<number>)
  {
    
    if(this.auth.currentUser?.email)
    {
      //DATA DEL PUNTAJE GLOBAL
     let d ={user: this.auth.currentUser?.email, 
            puntaje_general: ptos, 
            ahorcado: juegos[0],
            preguntados:juegos[1],
            mayor_menor:juegos[2],
            sudoku:juegos[3]} 

     const docRef = doc(this.firestore, 'puntaje', this.auth.currentUser?.uid);
     const snapshot = await getDoc(docRef);

     if(!snapshot.exists()) //NO HAY UN REGISTRO PREVIO
     {
      await setDoc(docRef, d)
     }
     else //HAY UN REGISTRO PREVIO Y SOLO HAY QUE ACTUALIZAR EL EXISTENTE
     {
      await setDoc(docRef, {puntaje_general: increment(ptos),
                            ahorcado: increment(juegos[0]),
                            preguntados:increment(juegos[1]),
                            mayor_menor:increment(juegos[2]),
                            sudoku:increment(juegos[3])
                           }, {merge: true})
     }
    }
    else
    {
      console.log("No usuario");
    }
  }

  obtener_puntajes(usuario : string)
  {  
    let col = collection(this.firestore, 'puntaje');
    const filtered = query(col,where('user', '==', usuario));
    return filtered;    
  }

  async guardar_partida_jugada(resultado : string, puntos : number)
  {
    if(this.auth.currentUser?.email)
      {
        //DATA PARTIDA
       let d ={user: this.auth.currentUser?.email, 
              puntaje: puntos, 
              resultado: resultado,
              fecha:new Date(),
              } 
  
       const col = collection(this.firestore, 'partidas');
       try
       {
        addDoc(col, d);
       }
       catch(e)
       {
        console.log(e);
       }

      }
      else
      {
        console.log("No usuario");
      }
  }

  obtener_ultimas_partidas(usuario : string)
  {
    let col = collection(this.firestore, 'partidas');
    const filtered = query(col,where('user', '==', usuario),orderBy('fecha', 'desc'),limit(5));
    return filtered;    
    return col;
  }
}

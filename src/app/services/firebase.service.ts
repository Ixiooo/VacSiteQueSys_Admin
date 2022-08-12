import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


//This will serve as Firebase Backend API

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'VacSiteQue';

  countercollectionName = 'QueueCounter';

  constructor
  (
    private firestore: AngularFirestore
  ) { }


  insert_to_queue(data)
  {
    return this.firestore.collection(this.collectionName).add(data);
  }

  read_queue()
  {
    return this.firestore.collection(this.collectionName, ref => ref.orderBy('queue_pos','asc')).snapshotChanges();
  }

  read_current_queue()
  {
    return this.firestore.collection(this.collectionName, ref => ref.where ('current', '==', true)).snapshotChanges();
  }

  set_current(recordID) {
    return this.firestore.doc(this.collectionName + '/' + recordID).update({current:true});
  }

  set_next(recordID) {
    return this.firestore.doc(this.collectionName + '/' + recordID).update({current:true});
  }

  delete_from_queue(data)
  {
    this.firestore.doc(this.collectionName + '/' + data).delete();
  }

  read_counter()
  {
    return this.firestore.collection(this.countercollectionName).snapshotChanges();
  }

  increase_counter(data)
  {
    return this.firestore.doc(this.countercollectionName + '/' + 'counter').update(data);
  }

  reset_counter()
  {
    return this.firestore.doc(this.countercollectionName + '/' + 'counter').update({queue_counter:1});
  }

  

}
  
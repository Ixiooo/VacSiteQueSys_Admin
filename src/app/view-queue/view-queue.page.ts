import { Component, OnInit } from '@angular/core';

//Firebase Imports
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface QueueData
{
  Name: string;
  Age: number;
  Address: string;
  queue_pos: number;
}




@Component({
  selector: 'app-view-queue',
  templateUrl: './view-queue.page.html',
  styleUrls: ['./view-queue.page.scss'],
})
export class ViewQueuePage {
  
  queueList = []; //Array for the information of Queue
  currentQueueList = []; //Array for the information of Current Queue
  queueCheck: [{exists:boolean}]  = [{exists:false}]; //Array to check if there is a queue

  queueData: QueueData;
  queueForm: FormGroup;

  constructor
  (
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private afs: AngularFirestore
  ) 
  { 
    this.queueData = {} as QueueData;
  }

  ngOnInit() 
  {

    //Read database value and assign to queuelist array
    this.firebaseService.read_queue().subscribe(data => 
    {
      this.queueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
          queue_pos: e.payload.doc.data()['queue_pos'],
        };
      })

      //Set queucheck.exists value to true if there are current people in queue
      if(this.queueList.length > 0)
      {
        this.queueCheck[0].exists = true;
      }
      else
      {
        this.queueCheck[0].exists = false;
      }

    })

    //Read database value and assign to currentqueuelist array
    this.firebaseService.read_current_queue().subscribe(data => 
      {
        this.currentQueueList = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['Name'],
            Age: e.payload.doc.data()['Age'],
            Address: e.payload.doc.data()['Address'],
            queue_pos: e.payload.doc.data()['queue_pos'],
            current: e.payload.doc.data()['current']
          };
        })
      })
  

  }

}

import { Component, OnInit } from '@angular/core';

//Firebase Imports
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

//Import for Alert
import { AlertController } from '@ionic/angular';

interface QueueData
{
  Name: string;
  Age: number;
  Address: string;
  queue_pos: number;
}


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage{

  queueList = []; //Array for the information of Queue
  currentQueueList = []; //Array for the current queue
  queueCheck: [{exists:boolean}]  = [{exists:false}]; //Array to check if there is a queue


  currentId: any;
  nextID: any;
  queueData: QueueData;
  queueForm: FormGroup;

  constructor
  (
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private afs: AngularFirestore,
    private alertController: AlertController
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
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Sex: e.payload.doc.data()['Sex'],
          Contact_Number: e.payload.doc.data()['Contact_Number'],
          Address: e.payload.doc.data()['Address'],
          queue_pos: e.payload.doc.data()['queue_pos'],
          current: e.payload.doc.data()['current']
        };
      })

      //Check if there are people in queue and get the id of the 1st and next person in queue
      if(this.queueList.length != 0)
      {
        //Check if there are more than 1 person in queue
        if(this.queueList.length > 1)
        {
          //If there are more than 1 person in queue, get the id of the next person
          this.currentId = this.queueList[0].id
          this.nextID = this.queueList[1].id
        }
        else
        {
          //If there are only 1 person in queue only get the id of that one person
          this.currentId = this.queueList[0].id
        }
      }

      //Check if there are people in queue
      if(this.queueList.length != 0) 
      {
        //Check if there are people currently being serviced
        if(this.queueList[0].current == false)
        {
          this.firebaseService.set_current(this.currentId) //If the result is false, it will set the 1st in queue to be serviced
        }   
      }
      

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
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Sex: e.payload.doc.data()['Sex'],
          Contact_Number: e.payload.doc.data()['Contact_Number'],
          Address: e.payload.doc.data()['Address'],
          queue_pos: e.payload.doc.data()['queue_pos'],
          current: e.payload.doc.data()['current']
        };
      })
    })

  }

  async resetConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reset Queue Number to 1',
      message: 'Are you sure you want to reset queue number to 1?',
      buttons: [
         {
          text: 'Confirm',
          handler: () => {
            if(this.queueList.length == 0)
            {
              this.showMessage('Reset Queue Number','Queue Number Reset to 1 Successfully')
              this.firebaseService.reset_counter()
            }
            else
            {
              this.showMessage('Reset Queue Number','Error, queue number can be reset only if queue list is empty')
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });
    await alert.present();
  }

  async showMessage(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  nextinQueue()
  {
    this.firebaseService.delete_from_queue(this.currentId)

  }

}

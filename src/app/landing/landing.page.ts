import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

//Import for Alert
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor
  (
    private navController: NavController,
    private alertController: AlertController
  ) 
  { 

  }

  ngOnInit() 
  {

  }


  continue()
  {
    this.confirm()
    
  } 

  async confirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vaccination Queueing',
      message: 'You are using the app as an administrator',
      buttons: [
         {
          text: 'Okay',
          handler: () => {
            this.navController.navigateRoot('tabs/admin-home');
          }
        }
      ]
    });

    await alert.present();
  }

}


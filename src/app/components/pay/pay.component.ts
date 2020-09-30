import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { timingSafeEqual } from 'crypto';
import { Bill } from 'src/app/models/bill';
import { Pay } from 'src/app/models/pay';
import { PayService } from 'src/app/services/pay.service';
import { pathToFileURL } from 'url';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {

  @Input() value;
  private screen = 'Payment';
  private rtaBill: Bill;
  private months = [1,2,3,4,5,6,7,8,9,10,12];
  private years = [2021,2022,2023,2024];
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private formbld: FormBuilder,
    private srvPay: PayService,
    private router: Router
  ) { 
    this.form = this.formbld.group({
      name: ["", [Validators.required]],
      number: ["", [Validators.required]], 
      year: ["", [Validators.required]], 
      month: ["", [Validators.required]],
      cvv: ["", [Validators.required]]
    });
  }

  ngOnInit() {}

  pay(){
    let pay: Pay = new Pay();
    pay.idConvenio = 1;
    pay.idUsuario = 1;
    pay.valor = this.value;
    pay.referencia = 1234;
    this.srvPay.pagar(pay).subscribe( rta => {
      if(rta != null){
        this.screen = 'Bill';
        this.rtaBill = rta;
      }
      console.log(rta);
    })
  }

  home(){
    this.modalController.dismiss();
    this.presentToast();
    this.router.navigate(['/home/event']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '¡Gracias por su compra!',
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }
  

}

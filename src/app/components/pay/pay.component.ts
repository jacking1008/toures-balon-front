import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Bill } from 'src/app/models/bill';
import { Client } from 'src/app/models/client';
import { Pay } from 'src/app/models/pay';
import { PayResponse } from 'src/app/models/pay-response';
import { Payment } from 'src/app/models/payment';
import { ProductItem } from 'src/app/models/product-item';
import { Reserve } from 'src/app/models/reserve';
import { UserPayment } from 'src/app/models/user-pay';
import { ClientService } from 'src/app/services/client.service';
import { PayService } from 'src/app/services/pay.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {

  visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  amex = new RegExp("^3[47][0-9]{13}$");
  mastercard = new RegExp("^5[1-5][0-9]{14}$");
  visaBlur = "30%";
  masterCardBlur = "30%";
  amexBlur = "30%";

  @Input() value : ProductItem[];
  private screen = 'Payment';
  private rtaBill: PayResponse;
  private months = [1,2,3,4,5,6,7,8,9,10,12];
  private years = [2021,2022,2023,2024];
  form: FormGroup;
  client: Client;
  convenio: number;
  cardType: string;
  reducer = (accumulator, currentValue) => accumulator + currentValue;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private formbld: FormBuilder,
    private router: Router,
    private clientSrv: ClientService,
    private reserveSrv: ReserveService
  ) { 
    this.form = this.formbld.group({
      name: ["", [Validators.required]],
      number: ["", [Validators.required, Validators.maxLength(19)]], 
      year: ["", [Validators.required]], 
      month: ["", [Validators.required]],
      cvv: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    let sessionId = sessionStorage.getItem('idUser');
    let token = sessionStorage.getItem('token');
    this.clientSrv.getById(sessionId,token).subscribe( rta => {
      this.client = rta;
    })
    
  }

  pay(){
    debugger;
    let reserva = new Reserve();
    let usuario = new UserPayment();
    usuario.id = this.client.idClient;
    usuario.firstName = this.client.firstName;
    usuario.lastName = this.client.lastName;
    usuario.email = this.client.email;
    usuario.categoria = this.client.userType;
    reserva.usuario = usuario;
    let payment = new Payment();
    payment.idConvenio = this.convenio;
    payment.cardType = this.cardType;
    payment.cardDate = this.form.value.month + this.form.value.year;
    payment.cardNumber = parseInt(this.form.value.number);
    payment.cardOwnerId = usuario.id;
    payment.cvv = parseInt(this.form.value.cvv);
    payment.due = 24;
    payment.cardOwnerName = this.form.value.name;
    reserva.payment = payment;
    reserva.referencia = Math.floor(Math.random()*10000000);
    reserva.total = this.value.map( r => { return r.total } ).reduce(this.reducer);
    reserva.productList = this.value;

    this.reserveSrv.reserve(reserva).subscribe( rta => {
      if(rta != null){
        this.screen = 'Bill';
        this.rtaBill = rta.pagoResponse;
      }
      console.log(rta);
    })
  }

  validateCard(valueCard){
    if(this.visa.test(valueCard)){
      this.visaBlur = "100%";
      this.amexBlur = "30%";
      this.masterCardBlur = "30%";
      this.convenio = 1;
      this.cardType = "VISA";
    } else if(this.mastercard.test(valueCard)){
      this.masterCardBlur = "100%";
      this.visaBlur = "30%";
      this.amexBlur = "30%";
      this.convenio = 2;
      this.cardType = "MASTERCARD";
    } else if(this.amex.test(valueCard)){
      this.amexBlur = "100%";
      this.visaBlur = "30%";
      this.masterCardBlur = "30%";
      this.convenio = 1;
      this.cardType = "AMEX";
    } else{
      this.visaBlur = "30%";
      this.amexBlur = "30%";
      this.masterCardBlur = "30%";
      this.convenio = 1;
      this.cardType = "OTHER";
    }
  }

  home(){
    this.modalController.dismiss();
    this.presentToast();
    this.router.navigate(['/']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '¡Gracias por su orden, se está procesando su reserva, esté atento a su correo electrónico !',
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }
  

}

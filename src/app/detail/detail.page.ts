import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { ShowService } from '../services/show.service';
import { ActivatedRoute } from '@angular/router';
import { DetailShow } from '../models/detail-show';
import { Locality } from '../models/locality';
import { CurrencyFormat } from '../global/currency-format';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  form: FormGroup;

  private detail: DetailShow = new DetailShow();
  private localidad: Locality = new Locality();

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private eventSrv : ShowService,
    private formbld: FormBuilder 
  ) { 
    this.form = this.formbld.group({
      locality: ["", [Validators.required]],
      quantity: ["", [Validators.required, Validators.maxLength(2)]]
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.eventSrv.cargarById(parseInt(id)).subscribe( rta => {
      this.detail = rta;
    })
  }

  async presentModal() {
    debugger
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        image: this.detail.imageLocalities
      }
    });
    return await modal.present();
  }

  onSelectChange(selectedValue: any) {
    this.localidad = this.detail.localities.find( e => e.id == selectedValue.target.value);
  }

  getDate(){
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dTemp = new Date(this.detail.date);
    return dTemp != undefined ? dTemp.toLocaleDateString("es-CO",options) : "";
  }

  getHours(){
    let dTemp = new Date(this.detail.date);
    return dTemp != undefined ? dTemp.getHours() + ":" + dTemp.getMinutes() : "";
  }

  getFormattedPrice(){
    return this.localidad.price != undefined ? CurrencyFormat.convertFormatting('USD', this.localidad.price) : "";
  }

}

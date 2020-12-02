import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartShopPage } from './cart-shop.page';

describe('CartShopPage', () => {
  let component: CartShopPage;
  let fixture: ComponentFixture<CartShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

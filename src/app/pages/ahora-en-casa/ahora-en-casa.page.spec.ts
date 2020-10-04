import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AhoraEnCasaPage } from './ahora-en-casa.page';

describe('AhoraEnCasaPage', () => {
  let component: AhoraEnCasaPage;
  let fixture: ComponentFixture<AhoraEnCasaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhoraEnCasaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AhoraEnCasaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

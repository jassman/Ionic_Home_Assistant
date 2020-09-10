import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemperaturahumedadPage } from './temperaturahumedad.page';

describe('TemperaturahumedadPage', () => {
  let component: TemperaturahumedadPage;
  let fixture: ComponentFixture<TemperaturahumedadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperaturahumedadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemperaturahumedadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

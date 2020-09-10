import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SliderTemperaturaComponent } from './slider-temperatura.component';

describe('SliderTemperaturaComponent', () => {
  let component: SliderTemperaturaComponent;
  let fixture: ComponentFixture<SliderTemperaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderTemperaturaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

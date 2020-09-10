import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HabitacionesPage } from './habitaciones.page';

describe('HabitacionesPage', () => {
  let component: HabitacionesPage;
  let fixture: ComponentFixture<HabitacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

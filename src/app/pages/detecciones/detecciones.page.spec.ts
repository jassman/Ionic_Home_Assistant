import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeteccionesPage } from './detecciones.page';

describe('DeteccionesPage', () => {
  let component: DeteccionesPage;
  let fixture: ComponentFixture<DeteccionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeteccionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeteccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

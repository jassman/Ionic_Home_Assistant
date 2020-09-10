import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticulasPage } from './particulas.page';

describe('ParticulasPage', () => {
  let component: ParticulasPage;
  let fixture: ComponentFixture<ParticulasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticulasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticulasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

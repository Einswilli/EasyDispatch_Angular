import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChargementComponent } from './modal-chargement.component';

describe('ModalChargementComponent', () => {
  let component: ModalChargementComponent;
  let fixture: ComponentFixture<ModalChargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChargementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

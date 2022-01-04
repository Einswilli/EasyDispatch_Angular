import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCiterneComponent } from './modal-citerne.component';

describe('ModalCiterneComponent', () => {
  let component: ModalCiterneComponent;
  let fixture: ComponentFixture<ModalCiterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCiterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCiterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

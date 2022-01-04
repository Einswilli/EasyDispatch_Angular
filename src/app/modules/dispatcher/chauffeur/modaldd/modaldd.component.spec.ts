import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalddComponent } from './modaldd.component';

describe('ModalddComponent', () => {
  let component: ModalddComponent;
  let fixture: ComponentFixture<ModalddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChauffeurComponent } from './modal-chauffeur.component';

describe('ModalChauffeurComponent', () => {
  let component: ModalChauffeurComponent;
  let fixture: ComponentFixture<ModalChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChauffeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

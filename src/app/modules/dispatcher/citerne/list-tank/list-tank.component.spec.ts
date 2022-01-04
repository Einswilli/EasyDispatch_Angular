import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTankComponent } from './list-tank.component';

describe('ListTankComponent', () => {
  let component: ListTankComponent;
  let fixture: ComponentFixture<ListTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

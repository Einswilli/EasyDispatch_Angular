import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCiterneComponent } from './details-citerne.component';

describe('DetailsCiterneComponent', () => {
  let component: DetailsCiterneComponent;
  let fixture: ComponentFixture<DetailsCiterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCiterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCiterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

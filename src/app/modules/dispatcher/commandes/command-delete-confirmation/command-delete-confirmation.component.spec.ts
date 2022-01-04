import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDeleteConfirmationComponent } from './command-delete-confirmation.component';

describe('CommandDeleteConfirmationComponent', () => {
  let component: CommandDeleteConfirmationComponent;
  let fixture: ComponentFixture<CommandDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCharacterComponent } from './manage-character.component';

describe('ManageCharacterComponent', () => {
  let component: ManageCharacterComponent;
  let fixture: ComponentFixture<ManageCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

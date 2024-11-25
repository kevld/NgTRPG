import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMasterComponent } from './game-master.component';

describe('GameMasterComponent', () => {
  let component: GameMasterComponent;
  let fixture: ComponentFixture<GameMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

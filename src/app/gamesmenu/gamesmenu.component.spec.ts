import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesmenuComponent } from './gamesmenu.component';

describe('GamesmenuComponent', () => {
  let component: GamesmenuComponent;
  let fixture: ComponentFixture<GamesmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

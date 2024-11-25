import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UigameComponent } from './uigame.component';

describe('UigameComponent', () => {
  let component: UigameComponent;
  let fixture: ComponentFixture<UigameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UigameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UigameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

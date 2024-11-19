import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGuesssignComponent } from './ranking-guesssign.component';

describe('RankingGuesssignComponent', () => {
  let component: RankingGuesssignComponent;
  let fixture: ComponentFixture<RankingGuesssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGuesssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingGuesssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

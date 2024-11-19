import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGuesssecuenceComponent } from './ranking-guesssecuence.component';

describe('RankingGuesssecuenceComponent', () => {
  let component: RankingGuesssecuenceComponent;
  let fixture: ComponentFixture<RankingGuesssecuenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGuesssecuenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingGuesssecuenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

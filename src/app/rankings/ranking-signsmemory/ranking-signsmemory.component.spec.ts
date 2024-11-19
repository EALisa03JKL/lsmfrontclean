import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingSignsmemoryComponent } from './ranking-signsmemory.component';

describe('RankingSignsmemoryComponent', () => {
  let component: RankingSignsmemoryComponent;
  let fixture: ComponentFixture<RankingSignsmemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingSignsmemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingSignsmemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

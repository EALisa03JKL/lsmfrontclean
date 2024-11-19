import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuesssecuenceComponent } from './guesssecuence.component';

describe('GuesssecuenceComponent', () => {
  let component: GuesssecuenceComponent;
  let fixture: ComponentFixture<GuesssecuenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuesssecuenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuesssecuenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

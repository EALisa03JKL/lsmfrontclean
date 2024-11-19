import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuesssignComponent } from './guesssign.component';

describe('GuesssignComponent', () => {
  let component: GuesssignComponent;
  let fixture: ComponentFixture<GuesssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuesssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuesssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UistartofComponent } from './uistartof.component';

describe('UistartofComponent', () => {
  let component: UistartofComponent;
  let fixture: ComponentFixture<UistartofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UistartofComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UistartofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

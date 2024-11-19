import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UistartComponent } from './uistart.component';

describe('UistartComponent', () => {
  let component: UistartComponent;
  let fixture: ComponentFixture<UistartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UistartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UistartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

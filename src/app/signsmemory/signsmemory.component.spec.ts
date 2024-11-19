import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignsmemoryComponent } from './signsmemory.component';

describe('SignsmemoryComponent', () => {
  let component: SignsmemoryComponent;
  let fixture: ComponentFixture<SignsmemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignsmemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignsmemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

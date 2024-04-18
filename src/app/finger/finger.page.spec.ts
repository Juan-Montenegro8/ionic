import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FingerPage } from './finger.page';

describe('FingerPage', () => {
  let component: FingerPage;
  let fixture: ComponentFixture<FingerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FingerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

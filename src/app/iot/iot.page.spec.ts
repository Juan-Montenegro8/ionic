import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IotPage } from './iot.page';

describe('IotPage', () => {
  let component: IotPage;
  let fixture: ComponentFixture<IotPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

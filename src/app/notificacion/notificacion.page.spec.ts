import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionPage } from './notificacion.page';

describe('NotificacionPage', () => {
  let component: NotificacionPage;
  let fixture: ComponentFixture<NotificacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

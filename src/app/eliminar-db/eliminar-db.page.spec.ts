import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarDBPage } from './eliminar-db.page';

describe('EliminarDBPage', () => {
  let component: EliminarDBPage;
  let fixture: ComponentFixture<EliminarDBPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EliminarDBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

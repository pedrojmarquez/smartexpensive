import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompartidosPage } from './compartidos.page';

describe('CompartidosPage', () => {
  let component: CompartidosPage;
  let fixture: ComponentFixture<CompartidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaveMaestraComponent } from './listar-clave-maestra.component';

describe('ClaveMaestraComponent', () => {
  let component: ClaveMaestraComponent;
  let fixture: ComponentFixture<ClaveMaestraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaveMaestraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaveMaestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

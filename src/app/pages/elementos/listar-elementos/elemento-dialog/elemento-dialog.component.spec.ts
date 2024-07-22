import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoDialogComponent } from './elemento-dialog.component';

describe('ElementoDialogComponent', () => {
  let component: ElementoDialogComponent;
  let fixture: ComponentFixture<ElementoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

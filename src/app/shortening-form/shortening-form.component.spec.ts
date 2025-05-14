import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorteningFormComponent } from './shortening-form.component';

describe('ShorteningFormComponent', () => {
  let component: ShorteningFormComponent;
  let fixture: ComponentFixture<ShorteningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShorteningFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShorteningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

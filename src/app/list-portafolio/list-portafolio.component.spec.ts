import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPortafolioComponent } from './list-portafolio.component';

describe('ListPortafolioComponent', () => {
  let component: ListPortafolioComponent;
  let fixture: ComponentFixture<ListPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

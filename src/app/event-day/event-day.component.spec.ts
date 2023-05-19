import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EventDayComponent } from './event-day.component';

describe('EventDayComponent', () => {
  let component: EventDayComponent;
  let fixture: ComponentFixture<EventDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDayComponent ],
      imports: [IonicModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

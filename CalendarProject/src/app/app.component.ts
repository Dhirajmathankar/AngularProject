import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { EventService } from './event.service';
import { AlarmComponent } from './alarm/alarm.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  setdevColor: {
    primary: '#1e90ff',
    secondary: 'rgb(30 144 255 / 8%)',
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  @ViewChild(AlarmComponent) childComponent: AlarmComponent | undefined;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
        this.ngOnInit();
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.eventService.deleteEvent(event['id'] + "").subscribe();
        this.handleEvent('Deleted', event);
        this.ngOnInit();
      },
    },
  ];

  refresh: Subject<void> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  alertedStartEvents: Set<string> = new Set(); // Store alerted start event IDs
  alertedEndEvents: Set<string> = new Set(); // Store alerted end event IDs
  TodayTaskArray: any[] = []; // this array for store all the today event 
  constructor(private modal: NgbModal, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();

    // Check every minute if any event's start or end time matches the current time
    setInterval(() => {
      this.checkForEventTimes();
    }, 60000); // Check every minute
  }

  formatTitle(event: any, projectName: string): string {
    const excludeKeys = new Set(['Start Time' , 'Task Creator',  'Due Date' , 'Task', 'Creator' , 'Created At' ]);
    const eventEntries = Object.entries(event)
      .filter(([key]) => excludeKeys.has(key))
      .map(([key, value]) => `${key}-${value}`)
      .join(' , ');

    return `${eventEntries} , projectName - ${projectName}`; // Append project name
  }

  // loadEvents(): void {
  //   this.eventService.getEvents().subscribe((data: any) => {
  //     this.events = [];
  //     data.forEach((item: any) => {
  //       const eventsFromItem = item.taskList.map((event: any) => ({
  //         id: [item._id, event.eventId],
  //         start: new Date(event["Due Date"]),
  //         end: addHours(new Date(event["Due Date"]), 1/2),
  //         title: this.formatTitle(event, item.projectName),
  //         color: colors.setdevColor,
  //         actions: this.actions,
  //         resizable: {
  //           beforeStart: true,
  //           afterEnd: true,
  //         },
  //         draggable: true,
  //       }));
  //       this.events = this.events.concat(eventsFromItem);
  //     });

  //     this.refresh.next();
  //   });
  // }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data: any) => {
      this.events = [];
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());
      this.TodayTaskArray = []
      data.forEach((item: any) => {
        const eventsFromItem = item.taskList.map((event: any) => {
          const eventStart = new Date(event["Due Date"]);
          let eventEnd = new Date(localStorage.getItem(`${item._id}-${event.eventId}-end`) || addHours(eventStart, 0).toString());

          console.log(eventStart, "     ", eventEnd)
          const eventObject = {
            id: [item._id, event.eventId],
            start: eventStart,
            end: eventEnd,
            title: this.formatTitle(event, item.projectName),
            color: colors.setdevColor,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          };
          if (isSameDay(eventStart, todayStart)) {
            this.TodayTaskArray.push(eventObject);
          }
          return eventObject;
        });
        this.events = this.events.concat(eventsFromItem);
      });
      if (this.childComponent) {
        this.childComponent.getAllTodayEventArray(this.TodayTaskArray); 
      }
      //  console.log("Today's Tasks Array:", this.TodayTaskArray);
      this.refresh.next();
    });
  }
  
  // checkForEventTimes(): void {
  //   const now = new Date();
  //   const nowHour = now.getHours();
  //   const nowMinute = now.getMinutes();

  //   this.events.forEach(event => {
  //     const eventStart = new Date(event.start);
  //     const eventEnd = new Date(event.end+"");
      
  //     const eventId = `${event.id}`;
  //     if (eventStart.getHours() === nowHour && eventStart.getMinutes() === nowMinute) {
  //       if (!this.alertedStartEvents.has(eventId)) {
  //         alert(`Event '${event.title}' is starting now.`);
  //         this.alertedStartEvents.add(eventId);
  //       }
  //     }
  //     if (eventEnd.getHours() === nowHour && eventEnd.getMinutes() === nowMinute) {
  //       if (!this.alertedEndEvents.has(eventId)) {
  //         alert(`Event '${event.title}' has ended.`);
  //         this.alertedEndEvents.add(eventId);
  //       }
  //     }
  //   });
  // }

  checkForEventTimes(): void {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
  
    this.events.forEach(event => {
      const eventStart = new Date(event.start!);
      const eventEnd = new Date(event.end!);
      
      const eventId = `${event.id}`;
  
      if (eventStart.getHours() === nowHour && eventStart.getMinutes() === nowMinute) {
        if (!this.alertedStartEvents.has(eventId)) {
          alert(`Event '${event.title}' is starting now.`);
          this.alertedStartEvents.add(eventId);
          this.callChildMethod(30, event.title , event.id);
        }
      }
      if (eventEnd.getHours() === nowHour && eventEnd.getMinutes() === nowMinute) {
        if (!this.alertedEndEvents.has(eventId)) {
          alert(`Event '${event.title}' has ended.`);
          this.alertedEndEvents.add(eventId);
          this.callChildMethod(0, `${event.title} has ended`, event.id);
        }
      }
    });
  }
  
  callChildMethod(duration: number, message: string , botId : any): void {
    if (this.childComponent) {
      this.childComponent.startCountdown(duration, message, botId);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  // eventTimesChanged({ event, newStart }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map(iEvent => {
  //     if (iEvent === event) {
  //       const updatedEvent = { ...event, start: newStart, end: endOfDay(newStart) };
  //       const projectId: any = event.id;
  //       this.eventService.updateEvent(`${projectId[0]}`, `${projectId[1]}`, { "Due Date": newStart }).subscribe();
  //       return updatedEvent;
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  //   this.ngOnInit();
  // }

  eventTimesChanged({ event, newStart,  newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        const updatedEvent = { ...event, start: newStart, end: newEnd };
        const projectId: any = event.id;
        
        // Save the end date to local storage
        // console.log(newStart, '  ----  ', newEnd);
        // updatedEvent['end'].toString()
        localStorage.setItem(`${projectId[0]}-${projectId[1]}-end`, newEnd+"");
  
        this.eventService.updateEvent(`${projectId[0]}`, `${projectId[1]}`, { "Due Date": newStart }).subscribe();
        return updatedEvent;
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
    this.ngOnInit();
  }

  
  eventtitle: string = "";
  eventstart: string = "";
  handleEvent(action: string, event: CalendarEvent): void {
    this.eventtitle = event.title;
    this.eventstart = this.formatDate(event.start);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'md' });
  }

  formatDate(dateString: Date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const startTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`;

    const endTimeDate = new Date(date.getTime() + 30 * 60000);
    let endHours = endTimeDate.getHours();
    const endMinutes = endTimeDate.getMinutes();
    const endAmpm = endHours >= 12 ? 'PM' : 'AM';

    endHours = endHours % 12;
    endHours = endHours ? endHours : 12;

    const endTime = `${endHours}:${endMinutes < 10 ? '0' + endMinutes : endMinutes}${endAmpm}`;

    return `${dayOfWeek}, ${month} ${day}⋅${startTime} – ${endTime}`;
  }

  addEvent(): void {
    // Function to add new events
  }

  deleteEvent(_eventToDelete: CalendarEvent) {
    // Function to delete events
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { single, Subject, takeLast } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,} from 'date-fns';
import { EventService } from './event.service';

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
  setdevColor :{
    primary : '#1e90ff',
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
        this.eventService.deleteEvent(event['id']+"").subscribe();
        this.handleEvent('Deleted', event);
        this.ngOnInit();
      },
    },
  ];

  refresh: Subject<void> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  formatTitle(event: any, projectName: string): string {
    const excludeKeys = new Set(['eventId', 'projectId', 'processId', 'botId']);
    const eventEntries = Object.entries(event)
      .filter(([key]) => !excludeKeys.has(key))
      .map(([key, value]) => `${key}-${value}`)
      .join(' , '); 
  
    return `${eventEntries} , projectName - ${projectName}`; // Append project name
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data:any) => {
      this.events = [];
      data.forEach((item: any) => {
        const eventsFromItem = item.taskList.map((event: any) => ({
          id: [item._id, event.eventId],
          start: new Date(event["Due Date"]), 
          end:addHours(new Date(event["Due Date"]), 1/2),
          title: this.formatTitle(event, item.projectName),
          color: colors.setdevColor,
          actions: this.actions,
          // allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }));
        console.log(eventsFromItem)
        this.events = this.events.concat(eventsFromItem);
      });

// console.log(this.events)
      // data.taskList.forEach((event: any) =>{
      // console.log(event['Due Date'] , " this is your value dhiraj")
      // });

      this.refresh.next();
    });
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

  eventTimesChanged({ event, newStart }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        console.log('Updating event:', iEvent);
        console.log('New start time:', newStart);
        const updatedEvent = { ...event, start: newStart, end: endOfDay(newStart) };
        // const projectId = event.projectId || 'unknown'; // Use a default or fallback value if needed
      
        const projectId : any = event.id;
        // console.log('Project ID:', event.id, projectId[0]);
        // console.log(`${event.projectId}` , `${event.id}`, { "Due Date": newStart });
        this.eventService.updateEvent(`${projectId[0]}`, `${projectId[1]}`, { "Due Date": newStart }).subscribe();
        return updatedEvent;
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
    this.ngOnInit();
  }
  eventtitle : string = ""; 
  eventstart : string = "";  
  handleEvent(action: string, event: CalendarEvent): void {
    this.eventtitle = event.title ;
    this.eventstart =  this.formatDate(event.start);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'md' });
  }

  formatDate(dateString :Date) {
    // console.log(dateString)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    // Extract hours and minutes from the date object
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const startTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`;
    
    // Calculate end time (45 minutes after the start time)
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
    // const newEvent: CalendarEvent = {
    //   start: startOfDay(new Date()),
    //   end: endOfDay(new Date()),
    //   title: 'New event',
    //   color: colors.yellow,
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    // };
    // this.eventService.addEvent(newEvent).subscribe(event => {
    //   this.events = [...this.events, event];
    //   this.refresh.next();
    // });
  }

  deleteEvent(_eventToDelete: CalendarEvent) {
    // this.events = this.events.filter(event => event !== eventToDelete);
    // this.eventService.deleteEvent(`${eventToDelete.id}`).subscribe();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { format, getHours, getMinutes, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { EventService } from '../event.service';



interface Duration {
  hours: number,
  minutes: number;
  seconds: number;
}


@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  //   hours: string | undefined;
  //   minutes: string | undefined;
  //   seconds: string | undefined;
  //   blnAmPm: string | undefined;
  //   dayOfWeek: string | undefined;
  //   ddMMoo: string | undefined;
  //   weeks: any[] = [];
  //   resultObjectClockInfo : any | undefined ;
  //   StartTimeClock : any | undefined;

  //   countdownMinutes: string | undefined;
  //   countdownSeconds: string | undefined;
  //   countdownMessage: string | undefined;
  //   countdownInterval: any;

  //   days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  //   suffixes = ["th", "st", "nd", "rd"];

  //   constructor() { }

  //   ngOnInit(): void {
  //     this.updateTime();
  //     setInterval(() => this.updateTime(), 1000);
  //     this.getMonthWeeks();
  //   }


  // isDragging = false;
  // originalX = 0;
  // originalY = 0;
  // offsetX = 0;
  // offsetY = 0;

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.originalX = event.clientX;
    this.originalY = event.clientY;
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const deltaX = event.clientX - this.originalX;
      const deltaY = event.clientY - this.originalY;

      this.offsetX += deltaX;
      this.offsetY += deltaY;

      const container = document.querySelector('.draggable-container') as HTMLElement;
      if (container) {
        container.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
      }

      this.originalX = event.clientX;
      this.originalY = event.clientY;
    }
  }

  //   updateTime() {
  //     const now = new Date();
  //     let hours = now.getHours();
  //     const minutes = now.getMinutes();
  //     const seconds = now.getSeconds();

  //     this.blnAmPm = 'am';
  //     if (hours >= 12) {
  //       hours -= 12;
  //       this.blnAmPm = 'pm';
  //     }

  //     this.hours = hours < 10 ? '0' + hours : hours.toString();
  //     this.minutes = minutes < 10 ? '0' + minutes : minutes.toString();
  //     this.seconds = seconds < 10 ? '0' + seconds : seconds.toString();

  //     const dayOfMonth = now.getDate();
  //     const suffix = this.suffixes[(dayOfMonth < 30) ? (dayOfMonth % 10) : 0];
  //     this.ddMMoo = `${now.toLocaleString('default', { month: 'long' })} ${dayOfMonth}${suffix}, ${now.getFullYear()}`;
  //     this.dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
  //   }

  //   getMonthWeeks() {
  //     const dtmDate = new Date();
  //     const year = dtmDate.getFullYear();
  //     const month = dtmDate.getMonth();
  //     const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  //     let week = [];
  //     let weekNumber = 1;

  //     for (let day = 1; day <= lastDayOfMonth; day++) {
  //       const date = new Date(year, month, day);
  //       const dayOfWeek = date.getDay();

  //       if (dayOfWeek === 0 && day !== 1) {
  //         this.weeks.push(week);
  //         week = [];
  //         weekNumber++;
  //       }

  //       week.push({
  //         week: weekNumber,
  //         day,
  //         appointment: this.getAppointment(day),
  //         currDay: day === dtmDate.getDate()
  //       });
  //     }

  //     if (week.length) {
  //       this.weeks.push(week);
  //     }
  //   }

  //   getAppointment(day: number) {
  //     switch (day) {
  //       case 2:
  //         return 'Buy gift for mother';
  //       case 12:
  //         return 'Meeting with Feriha Yilmaz about app';
  //       case 26:
  //         return "Hurlin's Birthday";
  //       default:
  //         return '';
  //     }
  //   }


  //   parseStringToKeyValue(str: string): { keyValueObject: Record<string, string>, createdAtTime: string } {
  //     const keyValueObject: Record<string, string> = {};
  //     let createdAtTime = '';
  //     const entries = str.split(' , ');

  //     entries.forEach(entry => {
  //       const [key, value] = entry.split('-').map(part => part.trim());
  //       if (key && value) {
  //         if (key === 'Due Date') {
  //           const date = new Date(value);
  //           const formattedDate = format(date, 'd MMMM yyyy, hh:mm a');
  //           keyValueObject[key] = formattedDate;
  //         } else if (key === 'Created At') {
  //           const date = new Date(value);
  //           const formattedDate = format(date, 'd MMMM yyyy');
  //           createdAtTime = format(date, 'hh:mm a');
  //           keyValueObject[key] = formattedDate;
  //         } else {
  //           keyValueObject[key] = value;
  //         }
  //       }
  //     });

  //     return { keyValueObject, createdAtTime };
  //   }




  //    Task : string | undefined; 
  //    projectName : string | undefined ;
  //    TaskCreator : string | undefined ;
  //    DueDate : string | undefined ;
  //    CreatedAt : string | undefined ;
  //    botId : any | undefined = ["66865ffe40d572d41b61a0db", "665d69fd110d2662a7e3e281"];
  //    previousTaskButton : boolean = true;
  //    nextTaskButton : boolean = true;
  //    unmeuteButtonIcon : boolean | undefined = false;
  //    meuteButtonIcon : boolean | undefined  = true;
  //    runingAlarmButtonIcon : boolean | undefined = false ;

  //   startCountdown(duration: number, message: string, botId :any): void{
  // this.botId = botId ;
  // localStorage.setItem('botIds', JSON.stringify(this.botId));
  //     // console.log("Hello console", botId )
  //     this.countdownMessage = 'Time starts now!';
  //     const result = this.parseStringToKeyValue(message);
  //     this.Task  = result.keyValueObject['Task'];
  //     this.projectName = result.keyValueObject['projectName'];
  //     this.TaskCreator = result.keyValueObject['Task Creator'] ? result.keyValueObject['Task Creator']  : result.keyValueObject['Creator'] ;
  //     this.DueDate = result.keyValueObject['Due Date']
  //     this.CreatedAt = result.keyValueObject['Created At']
  //     this.resultObjectClockInfo = result.keyValueObject;
  //     this.StartTimeClock = result.createdAtTime;
  //     // console.log(this.resultObjectClockInfo)
  //     if(this.meuteButtonIcon){
  //       this.alarmTop();
  //     }
  //     let totalSeconds = duration * 60; // 30 minutes in seconds

  //     this.countdownInterval = setInterval(() => {
  //       const minutes = Math.floor(totalSeconds / 60);
  //       const seconds = totalSeconds % 60;

  //       this.countdownMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
  //       this.countdownSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

  //       if (totalSeconds <= 0) {
  //         clearInterval(this.countdownInterval);
  //         this.countdownMessage = 'Your time is up!';
  //       } else {
  //         totalSeconds--;
  //       }
  //     }, 1000);
  //   }




  // previousTask(){
  //   let currentIndex = -1;
  //   if (!this.botId) {
  //     alert("Sorry your Task is not loaded!")
  //   }else{
  //     for (let i = 0; i < this.TodayTaskArray.length; i++) {
  //       const task = this.TodayTaskArray[i];
  //         if (this.botId[0] === task['id'][0] && this.botId[1] === task['id'][1] ) {
  //           currentIndex = i;
  //           break;
  //         }
  //       }
  //   }
  // if (currentIndex >= 0) {
  //   const previousTask = this.TodayTaskArray[currentIndex - 1];
  //   this.botId = previousTask['id'];
  //   const result = this.parseStringToKeyValue(previousTask['title']);
  //   this.Task  = result.keyValueObject['Task'];
  //   this.projectName = result.keyValueObject['projectName'];
  //   this.CreatedAt = result.keyValueObject['Created At']
  //   this.StartTimeClock = result.createdAtTime;
  //   this.nextTaskButton = true;
  // }else{
  //   this.previousTaskButton = false ;

  // }
  //   // alert("previouse Task")
  // }

  // nextTast(){
  //   let currentIndex = -1;
  //   if (!this.botId) {
  //     alert("Sorry your Task is not loaded!")
  //   }else{
  //     for (let i = 0; i < this.TodayTaskArray.length; i++) {
  //       const task = this.TodayTaskArray[i];
  //       // for (let j = 0; j < this.botId.length; j++) {
  //         if (this.botId[0] === task['id'][0] && this.botId[1] === task['id'][1] ) {
  //           currentIndex = i;
  //           break;
  //         }
  //     }
  //   }
  // if (currentIndex >= 0 && currentIndex < this.TodayTaskArray.length - 1) {
  //   const nextTask = this.TodayTaskArray[currentIndex + 1];
  //   this.botId = nextTask['id'];
  //   const result = this.parseStringToKeyValue(nextTask['title']);
  //   this.Task  = result.keyValueObject['Task'];
  //   this.projectName = result.keyValueObject['projectName'];
  //   this.CreatedAt = result.keyValueObject['Created At']
  //   this.StartTimeClock = result.createdAtTime;
  //   this.previousTaskButton = true;
  // }else {
  //   this.nextTaskButton = false;

  // }
  // }

  // reloadTask(){
  //   const storedBotIds = localStorage.getItem('botIds');
  //   let currentIndex = -1;
  //   let botId; 
  //   if (!storedBotIds) {
  //     alert("Sorry your Task is not loaded!")
  //   }else{
  //     for (let i = 0; i < this.TodayTaskArray.length; i++) {
  //       const task = this.TodayTaskArray[i];
  //       botId = JSON.parse(storedBotIds);
  //         if (botId[0] === task['id'][0] && botId[1] === task['id'][1] ) {
  //           currentIndex = i;
  //           break;
  //         }
  //     }
  //   }
  //   const nextTask = this.TodayTaskArray[currentIndex];
  //   this.botId = nextTask['id'];
  //   const result = this.parseStringToKeyValue(nextTask['title']);
  //   this.Task  = result.keyValueObject['Task'];
  //   this.projectName = result.keyValueObject['projectName'];
  //   this.CreatedAt = result.keyValueObject['Created At']
  //   this.StartTimeClock = result.createdAtTime;
  //   this.previousTaskButton = true;
  //   this.nextTaskButton = true;
  // }


  // unmeuteButton(){
  //   this.unmeuteButtonIcon  = false;
  //   this.meuteButtonIcon = true;
  //   this.runingAlarmButtonIcon  = false ;
  // }
  // meuteButton(){
  //   this.unmeuteButtonIcon  = true;
  //   this.meuteButtonIcon = false;
  //   this.runingAlarmButtonIcon  = false ;
  // }

  // alarmTop(){
  //   const alarmAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); 
  //   alarmAudio.play().catch(error => {
  //       // console.error('Error playing the audio:', error);
  //   });
  //   this.unmeuteButtonIcon  = false;
  //   this.meuteButtonIcon = false;
  //   this.runingAlarmButtonIcon  = true ;

  //   setTimeout(() => {
  //       alarmAudio.pause();
  //       alarmAudio.currentTime = 0;
  //       this.unmeuteButtonIcon  = false;
  //       this.meuteButtonIcon = true;
  //       this.runingAlarmButtonIcon  = false ;
  //   }, 30000); 
  //   // console.log("Hello console")
  // }




  // hours: string | undefined;
  // minutes: string | undefined;
  // seconds: string | undefined;
  // blnAmPm: string | undefined;
  // dayOfWeek: string | undefined;
  // ddMMoo: string | undefined;
  // weeks: any[] = [];
  resultObjectClockInfo: any | undefined;
  StartTimeClock: any | undefined;

  countdownHours: string | undefined;
  countdownMinutes: string | undefined;
  countdownSeconds: string | undefined;
  countdownMessage: string | undefined;
  countdownInterval: any;

  Task: string | undefined;
  projectName: string | undefined;
  TaskCreator: string | undefined;
  DueDate: string | undefined;
  CreatedAt: string | undefined;
  botId: any | undefined;
  previousTaskButton: boolean = true;
  nextTaskButton: boolean = true;
  unmeuteButtonIcon: boolean | undefined = false;
  meuteButtonIcon: boolean | undefined = true;
  runingAlarmButtonIcon: boolean | undefined = false;
  TodayTaskArray: any = []

  isDragging = false;
  originalX = 0;
  originalY = 0;
  offsetX = 0;
  offsetY = 0;
  events: any = [];

  startTimeClockandCheckinfo: boolean = true;
  totalTask: any = 0;
  totalCompletedTask: any = 0;
  totalRemeningTask: any = 0
  alertedStartEvents: Set<string> = new Set(); // Store alerted start event IDs
  alertedEndEvents: Set<string> = new Set();
  CompleteTaskvisiblity: boolean = true;
  skipTaskvisiblity: boolean = true
  alarmAudio: HTMLAudioElement | null = null;
  audiovariable: HTMLAudioElement | null = null;
  timeoutId: ReturnType<typeof setTimeout> | null = null;
  indicatore2: boolean = false;


  constructor(private eventService: EventService) {

  }

  // getAllTodayEventArray(TodayTaskArray:any){
  //   this.TodayTaskArray = TodayTaskArray.sort((a:any , b:any) => a.start.getTime() - b.start.getTime());
  //   if (this.TodayTaskArray.length == 0) {
  //     this.countdownMessage = "Today's Task not available!";
  //   } else {
  //     if (this.getNextEventStartTime() != null) {
  //       this.countdownMessage = `Your task will start at  ${(this.getNextEventStartTime()['hours']) % 12}:${this.getNextEventStartTime()['minutes']}.`
  //     } else {
  //       this.countdownMessage = `Today's Task not available!.`
  //     }
  //   }
  // }

  intervalId: any;

  ngOnInit(): void {

    try {
      this.audiovariable = new Audio();
      this.audiovariable.src = 'assets/audio/audio.wav';
      this.audiovariable.load();
    } catch (error) {
      console.log(error)
    }

    this.loadEvents();
  }



  async loadEvents(): Promise<void> {
    try {
      this.eventService.getEvents().subscribe((data: any) => {
        this.events = [];
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());
        this.TodayTaskArray = []
        data.forEach((item: any) => {
          const eventsFromItem = item.taskList.map((event: any) => {
            const eventStart = new Date(event["Due Date"]);
            let eventEnd = new Date(event["End Date"]);
            const eventObject = {
              id: [item._id, event.eventId],
              start: eventStart,
              end: eventEnd,
              title: this.formatTitle(event, item.projectName),
            };
            if (isSameDay(eventStart, todayStart)) {
              this.TodayTaskArray.push(eventObject);
              console.log(eventObject)
            }

            return eventObject;
          });
          this.events = this.events.concat(eventsFromItem);
        });
        this.TodayTaskArray = this.TodayTaskArray.sort((a: any, b: any) => a.start.getTime() - b.start.getTime());
        if (this.TodayTaskArray.length == 0) {
          this.countdownMessage = "Today's Task not available!";
        } else {
          if (this.getNextEventStartTime() != null) {
            this.countdownMessage = `Your task will start at  ${(this.getNextEventStartTime()['hours']) % 12}:${this.getNextEventStartTime()['minutes']}.`
          } else {
            this.countdownMessage = `Today's Task not available!.`
          }
        }
        this.infoShowFunction();
      });
    } catch (e) {
      console.log(e)
    }
  }


  getNextEventStartTime(): any {
    const now = new Date();
    for (let event of this.TodayTaskArray) {
      const eventStart = new Date(event.start);
      if (eventStart > now) {
        return {
          hours: getHours(eventStart),
          minutes: getMinutes(eventStart)
        };
      }
    }
    return null;
  }

  // intervalId: any;

  //   startTimeClockandCheck() {
  //     this.checkForEventTimes();
  //     this.startTimeClockandCheckinfo = false;
  //     this.intervalId = setInterval(() => {
  //       this.checkForEventTimes();
  //     }, 1000); // 1000 milliseconds = 1 second
  // }


  infoShowFunction() {
    const now = new Date();
    this.totalTask = this.TodayTaskArray.length
    this.totalCompletedTask = this.TodayTaskArray.filter((task: any) => {
      const endTime = new Date(task.end);
      return endTime < now;
    }).length;
    this.totalRemeningTask = this.TodayTaskArray.filter((task: any) => {
      const startTime = new Date(task.start);
      const endTime = new Date(task.end);
      return startTime <= now && endTime >= now || startTime > now;
    }).length;
  };

  startTimeClockandCheck() {
    this.checkForEventTimes();
    this.startTimeClockandCheckinfo = false;
    const checkEventsPeriodically = async () => {
      try {
        await this.checkForEventTimes();
        this.infoShowFunction();
      } catch (error) {
        console.error("Error checking event times:", error);
        return;
      }
      this.intervalId = setTimeout(checkEventsPeriodically, 1000); // 1000 milliseconds = 1 second
    };
    checkEventsPeriodically();
  }


  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  formatTitle(event: any, projectName: string): string {
    const excludeKeys = new Set(['Start Time', 'Task Creator', 'Due Date', 'Task', 'Creator', 'Created At']);
    const eventEntries = Object.entries(event)
      .filter(([key]) => excludeKeys.has(key))
      .map(([key, value]) => `${key}-${value}`)
      .join(' , ');

    return `${eventEntries} , projectName - ${projectName}`; // Append project name
  }

  unmeuteButton() {
    this.unmeuteButtonIcon = false;
    this.meuteButtonIcon = true;
    this.runingAlarmButtonIcon = false;
  }
  meuteButton() {
    this.unmeuteButtonIcon = true;
    this.meuteButtonIcon = false;
    this.runingAlarmButtonIcon = false;
  }





  calculateTimeDifference(endTime: Date): any {
    const now = new Date();
    const end = new Date(endTime);
    let diff = end.getTime() - now.getTime();
    if (diff < 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00"
      };
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;

    const seconds = Math.floor(diff / 1000);

    // Convert to double digits if necessary
    const formattedHours = hours < 10 ? "0" + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();

    return {
      hours: formattedHours,
      minutes: formattedMinutes,
      seconds: formattedSeconds
    };
  }


  playAudio() {
    try {
      if (this.audiovariable) {
        if (this.audiovariable.paused) {
          this.unmeuteButtonIcon = false;
          this.meuteButtonIcon = false;
          this.runingAlarmButtonIcon = true;
          this.audiovariable.play().catch((error: any) => console.error("Audio play error:", error));
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  pauseAudio() {
    try {
      if (this.audiovariable) {
        if (!this.audiovariable.paused) {
          this.unmeuteButtonIcon = true;
          this.meuteButtonIcon = false;
          this.runingAlarmButtonIcon = false;
          this.audiovariable.pause()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  stopaudio() {
    this.unmeuteButtonIcon = true;
    this.meuteButtonIcon = false;
    this.runingAlarmButtonIcon = false;
    this.pauseAudio()
  }



  checkForEventTimes(): void {
    // console.log("Local host Dhiraj Mathankar");
    const now = new Date();
    let ongoingTaskDetected = false;
    let checkTaskPosition = {
      ongoingTaskOuter: -1,
      ongoingTaskInnerStart: -1,
      ongoingTaskInnerEnd: -1,
      ongoingTaskInner: -1,
      ongoingTaskStart: -1,
      ongoingTaskEnd: -1,
      taskBreak: -1,
      ongoingTaskOuterIndex: -1,
      ongoingTaskInnerIndex: -1,
      ongoingTaskstartIndex: -1,
      ongoingTaskEndIndexAudio: -1
    };

    this.TodayTaskArray.forEach((outerTask: any, outerIndex: number) => {
      const outerStart = new Date(outerTask.start!);
      const outerEnd = new Date(outerTask.end!);
      const outerTaskId = outerTask.id;

      let outerTaskTime = now > outerStart && now < outerEnd;

      // 1. Start task condition
      // if (now.getTime() === outerStart.getTime()) {
      //   checkTaskPosition.ongoingTaskStart = 1
      // }
      if (now.getHours() === outerStart.getHours() && now.getMinutes() === outerStart.getMinutes()) {
        checkTaskPosition.ongoingTaskStart = 1;
        checkTaskPosition.ongoingTaskstartIndex = outerIndex;
      }

      // 2. End task condition
      // else if (now.getTime() === outerEnd.getTime()) {
      //   checkTaskPosition.ongoingTaskEnd = 1
      // }
      else if (now.getTime() === outerEnd.getTime()) {
        checkTaskPosition.ongoingTaskEnd = 1;
        checkTaskPosition.ongoingTaskEndIndexAudio = outerIndex;
      }

      // 3. Ongoing task condition
      else if (outerTaskTime) {
        checkTaskPosition.ongoingTaskOuter = 1
        if (checkTaskPosition.ongoingTaskOuterIndex === -1) {
          checkTaskPosition.ongoingTaskOuterIndex = outerIndex;
        }


        // Loop through to find inner tasks
        this.TodayTaskArray.forEach((innerTask: any, innerIndex: number) => {
          if (innerIndex !== outerIndex) { // Avoid comparing the task with itself
            const innerStart = new Date(innerTask.start!);
            const innerEnd = new Date(innerTask.end!);

            // Check if inner task is within the outer task time frame
            if (innerStart >= outerStart && innerStart < outerEnd) {
              // console.log("Inner Task Detected within Outer Task");
              // Check if the inner task is completed before the outer task ends
              checkTaskPosition.ongoingTaskInner = 1;

              if (checkTaskPosition.ongoingTaskInnerIndex === -1) {
                checkTaskPosition.ongoingTaskInnerIndex = innerIndex;
              }
              if (now >= innerEnd) {
                checkTaskPosition.ongoingTaskInnerStart = 1
              } else {
                checkTaskPosition.ongoingTaskInnerEnd = 1
              }
              // return ;
            }
          }
        });
        // return
      }
      // 4. Break Time task condition
      else if (!outerTaskTime) {
        checkTaskPosition.taskBreak = 1
      }
    });

    //  console.log(checkTaskPosition )
    // console.log(checkTaskPosition)
    let alarmIndicatorestart = false;
    let alarmIndicatorend = false;
    if (checkTaskPosition.ongoingTaskStart === 1) {
      console.log("Task Start")
      if (this.meuteButtonIcon) {
        this.playAudio()
      }
      let currentruningTaskIndex = checkTaskPosition.ongoingTaskstartIndex;
      if (checkTaskPosition.ongoingTaskInnerIndex !== -1) {
        currentruningTaskIndex = checkTaskPosition.ongoingTaskInnerIndex
      } else if (checkTaskPosition.ongoingTaskOuterIndex !== -1) {
        currentruningTaskIndex = checkTaskPosition.ongoingTaskOuterIndex
      }
      const RuningTime = this.calculateTimeDifference(this.TodayTaskArray[currentruningTaskIndex].end)
      const task = this.TodayTaskArray[currentruningTaskIndex];
      this.startCountdown(RuningTime, { titleSms: "Task Start Now.... ", eventTitle: task.title }, task.id);
    }
    else if (checkTaskPosition.ongoingTaskInner === 1) {

      // if (this.TodayTaskArray[checkTaskPosition.ongoingTaskInnerIndex+1] ) {
      //   this.CompleteTaskvisiblity = true
      // }else{
      //   // this.skipTaskvisiblity  = false
      //   this.CompleteTaskvisiblity = false
      // }
      // console.log("Inner Task Runing", this.TodayTaskArray[checkTaskPosition.ongoingTaskInnerIndex].start)
      const RuningTime = this.calculateTimeDifference(this.TodayTaskArray[checkTaskPosition.ongoingTaskInnerIndex].end)
      const task = this.TodayTaskArray[checkTaskPosition.ongoingTaskInnerIndex];
      if (RuningTime.minutes <= 1) {
        this.startCountdown(RuningTime, { titleSms: `Task Will be End in ${RuningTime.seconds}Sec.... `, eventTitle: task.title }, task.id);
        if (this.meuteButtonIcon) {
          this.playAudio()
        }
      } else {
        this.startCountdown(RuningTime, { titleSms: "Task ongoing.... ", eventTitle: task.title }, task.id);
      }
      // console.log(this.calculateTimeDifference(this.TodayTaskArray[checkTaskPosition.ongoingTaskInnerIndex].end))
    }
    else if (checkTaskPosition.ongoingTaskOuter === 1) {

      // if (this.TodayTaskArray[checkTaskPosition.ongoingTaskOuterIndex+1] && checkTaskPosition.ongoingTaskInner === -1) {
      //   this.CompleteTaskvisiblity = true
      // }else{
      //   // this.skipTaskvisiblity  = false
      //   this.CompleteTaskvisiblity = false
      // }

      // console.log("Task ongoing", checkTaskPosition.ongoingTaskOuterIndex)
      const RuningTime = this.calculateTimeDifference(this.TodayTaskArray[checkTaskPosition.ongoingTaskOuterIndex].end)
      const task = this.TodayTaskArray[checkTaskPosition.ongoingTaskOuterIndex];
      if (RuningTime.minutes <= 1) {
        this.startCountdown(RuningTime, { titleSms: `Task Will be End in ${RuningTime.seconds}Sec.... `, eventTitle: task.title }, task.id);
        if (this.meuteButtonIcon) {
          this.playAudio()
        }

      } else {
        this.startCountdown(RuningTime, { titleSms: "Task ongoing.... ", eventTitle: task.title }, task.id);
      }

      // console.log(this.calculateTimeDifference(this.TodayTaskArray[checkTaskPosition.ongoingTaskOuterIndex].end!))
    }
    else if (checkTaskPosition.ongoingTaskEnd === 1) {
      console.log("Task End")
      // if (checkTaskPosition.ongoingTaskEndIndexAudio !== -1 && this.meuteButtonIcon) {
      //   this.playAudio()
      // }
      // let currentruningTaskIndex = checkTaskPosition.ongoingTaskstartIndex;
      // if (checkTaskPosition.ongoingTaskInnerIndex !== -1) {
      //   currentruningTaskIndex = checkTaskPosition.ongoingTaskInnerIndex
      // } else if (checkTaskPosition.ongoingTaskOuterIndex !== -1) {
      //   currentruningTaskIndex = checkTaskPosition.ongoingTaskOuterIndex
      // }
      // const RuningTime = this.calculateTimeDifference(this.TodayTaskArray[currentruningTaskIndex].end)
      // const task = this.TodayTaskArray[currentruningTaskIndex];

      // this.startCountdown(RuningTime, { titleSms: "Task Will be End in 1min.... ", eventTitle: task.title }, task.id);
    }
    else if (checkTaskPosition.taskBreak === 1) {

      const currentTime = new Date();
      const upcomingTask = this.TodayTaskArray.find((task: any) => new Date(task.start) > currentTime);

      if (upcomingTask) {
        this.CompleteTaskvisiblity = true
        this.skipTaskvisiblity = true
        console.log(upcomingTask);
        const RuningTime = this.calculateTimeDifference(upcomingTask.start)
        // this.startCountdown(RuningTime, { titleSms: "Your UpComing Task... ", eventTitle: upcomingTask.title }, upcomingTask.id);

        if (RuningTime.minutes <= 1) {
          this.startCountdown(RuningTime, { titleSms: `Task will start in ${RuningTime.seconds}Sec... `, eventTitle: upcomingTask.title }, upcomingTask.id);
          if (this.meuteButtonIcon) {
            this.playAudio()
          }

        } else {
          this.startCountdown(RuningTime, { titleSms: "Your UpComing Task... ", eventTitle: upcomingTask.title }, upcomingTask.id);
        }

      } else {
        this.CompleteTaskvisiblity = false
        this.skipTaskvisiblity = false
        const RuningTime = this.calculateTimeDifference(new Date())
        this.startCountdown(RuningTime, { titleSms: "Today All Task Ended... ", eventTitle: "" }, "");
      }
      // console.log("Task Break Time")
    }

  }






  startCountdown(duration: Duration, message: any, botId: any): void {
    console.log(duration)
    this.botId = botId;
    this.countdownMessage = message.titleSms;
    const result = this.parseStringToKeyValue(message.eventTitle);
    this.Task = result.keyValueObject['Task'] || '';
    this.projectName = result.keyValueObject['projectName'] || '';
    this.TaskCreator = result.keyValueObject['Task Creator'] || result.keyValueObject['Creator'] || '';
    this.DueDate = result.keyValueObject['Due Date'] || '';
    this.CreatedAt = result.keyValueObject['Created At'] || '';
    console.log(this.CreatedAt)
    this.resultObjectClockInfo = result.keyValueObject;
    this.StartTimeClock = result.createdAtTime;
    this.countdownHours = duration.hours.toString();
    this.countdownMinutes = duration.minutes.toString()
    this.countdownSeconds = duration.seconds.toString()
  }



  alarmTop(indicatoreValue: any) {
    let alarmAudio: any;
    // if (!alarmAudio) {
    //     alarmAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    // }
    // console.log(indicatoreValue)
    console.log("Hello console", indicatoreValue)
    //     if (indicatoreValue === 0) {
    if (!alarmAudio) {
      alarmAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    }
    alarmAudio.play().catch((error: any) => {
      console.error('Error playing the audio:', error);
    });
    this.unmeuteButtonIcon = false;
    this.meuteButtonIcon = false;
    this.runingAlarmButtonIcon = true;
    this.timeoutId = setTimeout(() => {
      alarmAudio?.pause();
      alarmAudio!.currentTime = 0;
      this.unmeuteButtonIcon = false;
      this.meuteButtonIcon = true;
      this.runingAlarmButtonIcon = false;
    }, 10000);
    // if (this.runingAlarmButtonIcon === true ) {
    //   alarmAudio.pause();
    //   if (this.timeoutId !== null) {
    //     clearTimeout(this.timeoutId);
    //     console.log("Timeout canceled.");
    //     this.unmeuteButtonIcon = false;
    //         this.meuteButtonIcon = true;
    //         this.runingAlarmButtonIcon = false;
    // }
    // }

  }



  parseStringToKeyValue(str: string): { keyValueObject: Record<string, string>, createdAtTime: string } {
    const keyValueObject: Record<string, string> = {};
    let createdAtTime = '';
    const entries = str.split(' , ');

    entries.forEach(entry => {
      const [key, value] = entry.split('-').map(part => part.trim());
      if (key && value) {
        if (key === 'Due Date') {
          const date = new Date(value);
          const formattedDate = format(date, 'd MMMM yyyy, hh:mm a');
          keyValueObject[key] = formattedDate;
        } else if (key === 'Created At') {
          const date = new Date(value);
          const formattedDate = format(date, 'd MMMM yyyy');
          createdAtTime = format(date, 'hh:mm:ss');
          keyValueObject[key] = formattedDate;
        } else {
          keyValueObject[key] = value;
        }
      }
    });

    return { keyValueObject, createdAtTime };
  }


  previousTask() {
    console.log("Hello console -.............. pre")
    let currentIndex = -1;
    if (!this.botId) {
      alert("Sorry your Task is not loaded!")
    } else {
      for (let i = 0; i < this.TodayTaskArray.length; i++) {
        const task = this.TodayTaskArray[i];
        if (this.botId[0] === task['id'][0] && this.botId[1] === task['id'][1]) {
          currentIndex = i;
          break;
        }
      }
    }
    if (currentIndex > 0) {
      const previousTask = this.TodayTaskArray[currentIndex - 1];
      this.botId = previousTask['id'];
      const result = this.parseStringToKeyValue(previousTask['title']);
      this.Task = result.keyValueObject['Task'];
      this.projectName = result.keyValueObject['projectName'];
      this.CreatedAt = result.keyValueObject['Created At']
      this.StartTimeClock = result.createdAtTime;
      this.nextTaskButton = true;
    } else {
      this.previousTaskButton = false;

    }
    // alert("previouse Task")
  }

  nextTast() {
    console.log("Hello console -.............. next")
    this.loadEvents()
    let currentIndex = -1;
    if (!this.botId) {
      alert("Sorry your Task is not loaded!")
    } else {
      for (let i = 0; i < this.TodayTaskArray.length; i++) {
        const task = this.TodayTaskArray[i];
        // for (let j = 0; j < this.botId.length; j++) {
        if (this.botId[0] === task['id'][0] && this.botId[1] === task['id'][1]) {
          currentIndex = i;
          break;
        }
      }
    }
    if (currentIndex >= 0 && currentIndex < this.TodayTaskArray.length - 1) {
      const nextTask = this.TodayTaskArray[currentIndex + 1];
      this.botId = nextTask['id'];
      const result = this.parseStringToKeyValue(nextTask['title']);
      this.Task = result.keyValueObject['Task'];
      this.projectName = result.keyValueObject['projectName'];
      this.CreatedAt = result.keyValueObject['Created At']
      this.StartTimeClock = result.createdAtTime;
      this.previousTaskButton = true;
    } else {
      this.nextTaskButton = false;

    }
  }

  reloadTask() {

    this.ngOnInit()
    this.loadEvents()
    // this.startCountdown(10, "Created At-2024-05-29T07:02:13.023Z , Task Creator-Monalisa Sahoo , Task-JWT Implementation , Due Date-2024-08-13T12:47:00.000Z , projectName - Collab Pro CLD", '')
    // const storedBotIds = localStorage.getItem('botIds');
    // let currentIndex = -1;
    // let botId; 
    // if (!storedBotIds) {
    //   alert("Sorry your Task is not loaded!")
    // }else{
    //   for (let i = 0; i < this.TodayTaskArray.length; i++) {
    //     const task = this.TodayTaskArray[i];
    //     botId = JSON.parse(storedBotIds);
    //       if (botId[0] === task['id'][0] && botId[1] === task['id'][1] ) {
    //         currentIndex = i;
    //         break;
    //       }
    //   }
    // }
    // const nextTask = this.TodayTaskArray[currentIndex];
    // this.botId = nextTask['id'];
    // const result = this.parseStringToKeyValue(nextTask['title']);
    // this.Task  = result.keyValueObject['Task'];
    // this.projectName = result.keyValueObject['projectName'];
    // this.CreatedAt = result.keyValueObject['Created At']
    // this.StartTimeClock = result.createdAtTime;
    // this.previousTaskButton = true;
    // this.nextTaskButton = true;
  }
  async skipTask() {
    console.log("Skip Task...");
    const now = new Date();
    let lastTaskEnd: Date | null = null;
    let ongoingIndex = -1;
    let upcomingIndex = -1;
    if (confirm("Do you want skip?")) {
      this.TodayTaskArray.forEach((task: any, index: any) => {
        const startTime = new Date(task.start);
        const endTime = new Date(task.end);
        if (now >= startTime && now <= endTime && this.TodayTaskArray[index + 1] && ongoingIndex === -1) {
          ongoingIndex = index;
        }
        else if (now <= startTime && this.TodayTaskArray[index] && upcomingIndex === -1) {
          upcomingIndex = index;
        }

      });
      if (ongoingIndex === -1 && upcomingIndex === -1) {
        return;
      }

      if (ongoingIndex !== -1) {
        const skippedTask = this.TodayTaskArray.splice(ongoingIndex, 1)[0];
        // let newStartTime = new Date(skippedTask.start).getTime();
        this.TodayTaskArray = this.TodayTaskArray.sort((a: any, b: any) => a.start.getTime() - b.start.getTime());

        let tempStart = skippedTask.start;

        for (let index = ongoingIndex; index < this.TodayTaskArray.length; index++) {
          const taskStart = new Date(this.TodayTaskArray[index].start);
          const taskEnd = new Date(this.TodayTaskArray[index].end);
          const duration = Math.abs(taskEnd.getTime() - taskStart.getTime());
          const tempStartTime = new Date(tempStart).getTime();
          const newEndTime = new Date(tempStartTime + duration);
          this.TodayTaskArray[index].start = new Date(tempStartTime);
          this.TodayTaskArray[index].end = newEndTime;
          tempStart = taskStart;
        }
        // console.log("Hello console", this.TodayTaskArray)

        const duration = Math.abs(new Date(skippedTask.end).getTime() - new Date(skippedTask.start).getTime())

        skippedTask.start = new Date(this.TodayTaskArray[this.TodayTaskArray.length - 1].end + 5 * 60 * 1000);
        console.log(skippedTask.start, duration)
        skippedTask.end = new Date(skippedTask.start + duration);
        this.TodayTaskArray.push(skippedTask)
        console.log(this.TodayTaskArray)

        for (let index = ongoingIndex; index < this.TodayTaskArray.length; index++) {
          try {
            this.eventService.updateEvent(
              `${this.TodayTaskArray[index]['id'][0]}`,
              `${this.TodayTaskArray[index]['id'][1]}`,
              { "Due Date": this.TodayTaskArray[index]['start'], "End Date": this.TodayTaskArray[index]['end'] }
            ).subscribe();
            console.log("done")

          } catch (e) {
            console.log(e)
          }

        }


      } else if (upcomingIndex !== -1 && ongoingIndex === -1) {
        let currentDate = new Date();
        this.TodayTaskArray[upcomingIndex].start = currentDate;
        this.eventService.updateEvent(
          `${this.TodayTaskArray[upcomingIndex]['id'][0]}`,
          `${this.TodayTaskArray[upcomingIndex]['id'][1]}`,
          { "Due Date": this.TodayTaskArray[upcomingIndex]['start'], "End Date": this.TodayTaskArray[upcomingIndex]['end'] }
        ).subscribe();
        this.ngOnInit();
        return;
      }
    }


    this.ngOnInit();
  }

  checkOnGoingTask(): number {
    const currentTime = new Date();
    let ongoingTaskIndex = -1;
    for (let i = 0; i < this.TodayTaskArray.length; i++) {
      const task = this.TodayTaskArray[i];
      const startTime = new Date(task.start);
      const endTime = new Date(task.end);

      if (currentTime >= startTime && currentTime <= endTime) {
        ongoingTaskIndex = i;
        return ongoingTaskIndex;
      }
    }
    return -1;
  }

  showBreakTimeInput: boolean = false;
  showBreakTimeInputsms: boolean = false;
  breakTime: number | null = null;
  DoneTaskInfo: string = "Choose your break time:"

  CompleteTask() {
    if (confirm("Have you confirm you have completed your Task")) {
      
    if (this.checkOnGoingTask() + 1 < this.TodayTaskArray.length) {
      this.showBreakTimeInput = true;
      this.showBreakTimeInputsms = true;
      this.DoneTaskInfo = "Choose your break time:"
    } else {
      this.showBreakTimeInput = true;
      this.showBreakTimeInputsms = false;
      this.DoneTaskInfo = "Your all Today Task Completed!"
      setTimeout(() => {
        this.showBreakTimeInput = false;
      }, 1000)
    }}
  }
  onBreakTimeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.breakTime = inputElement.value ? parseInt(inputElement.value, 10) : null;
    console.log(this.breakTime);
  }
  async CompleteAndSetNextTask() {

    if (this.breakTime != null) {
      const currentTime = new Date();
      let ongoingTaskIndex = this.checkOnGoingTask();;

      // if (ongoingTaskIndex !== -1 && ongoingTaskIndex + 1 < this.TodayTaskArray.length) {
      const nextTask = this.TodayTaskArray[ongoingTaskIndex + 1];
      const taskDuration = new Date(nextTask.end).getTime() - new Date(nextTask.start).getTime();
      const newStartTime = new Date(currentTime);
      // const duration = Math.abs(new Date(skippedTask.end).getTime() - new Date(skippedTask.start).getTime())
      newStartTime.setMinutes(newStartTime.getMinutes() + this.breakTime);
      // console.log(nextTask.start, "   ", nextTask.end )
      nextTask.start = newStartTime;
      // console.log( nextTask.start, nextTask.end )

      nextTask.end = new Date(new Date(nextTask.start).getTime() + taskDuration);

      this.TodayTaskArray[ongoingTaskIndex + 1] = nextTask;
      console.log(nextTask.start, nextTask.end, " taskDuration", taskDuration)
      console.log(`${nextTask['id'][0]}`, `${nextTask['id'][1]}`, { "Due Date": nextTask['start'], "End Date": nextTask['end'] }, "    ", nextTask['title'])
      try {
        await this.eventService.updateEvent(`${nextTask['id'][0]}`, `${nextTask['id'][1]}`, { "Due Date": nextTask['start'], "End Date": nextTask['end'] }).subscribe();
      } catch (error) {
      }

    }

    this.showBreakTimeInput = false;
    this.breakTime = null;
    // }
  }
}

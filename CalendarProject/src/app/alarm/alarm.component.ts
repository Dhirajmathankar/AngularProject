import { Component, OnInit } from '@angular/core';
import { format, getHours, getMinutes } from 'date-fns';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  hours: string | undefined;
  minutes: string | undefined;
  seconds: string | undefined;
  blnAmPm: string | undefined;
  dayOfWeek: string | undefined;
  ddMMoo: string | undefined;
  weeks: any[] = [];
  resultObjectClockInfo : any | undefined ;
  StartTimeClock : any | undefined;

  countdownMinutes: string | undefined;
  countdownSeconds: string | undefined;
  countdownMessage: string | undefined;
  countdownInterval: any;

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  suffixes = ["th", "st", "nd", "rd"];

  constructor() { }

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.getMonthWeeks();
  }


  isDragging = false;
  originalX = 0;
  originalY = 0;
  offsetX = 0;
  offsetY = 0;

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

  updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.blnAmPm = 'am';
    if (hours >= 12) {
      hours -= 12;
      this.blnAmPm = 'pm';
    }

    this.hours = hours < 10 ? '0' + hours : hours.toString();
    this.minutes = minutes < 10 ? '0' + minutes : minutes.toString();
    this.seconds = seconds < 10 ? '0' + seconds : seconds.toString();

    const dayOfMonth = now.getDate();
    const suffix = this.suffixes[(dayOfMonth < 30) ? (dayOfMonth % 10) : 0];
    this.ddMMoo = `${now.toLocaleString('default', { month: 'long' })} ${dayOfMonth}${suffix}, ${now.getFullYear()}`;
    this.dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
  }

  getMonthWeeks() {
    const dtmDate = new Date();
    const year = dtmDate.getFullYear();
    const month = dtmDate.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    let week = [];
    let weekNumber = 1;

    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 && day !== 1) {
        this.weeks.push(week);
        week = [];
        weekNumber++;
      }

      week.push({
        week: weekNumber,
        day,
        appointment: this.getAppointment(day),
        currDay: day === dtmDate.getDate()
      });
    }

    if (week.length) {
      this.weeks.push(week);
    }
  }

  getAppointment(day: number) {
    switch (day) {
      case 2:
        return 'Buy gift for mother';
      case 12:
        return 'Meeting with Feriha Yilmaz about app';
      case 26:
        return "Hurlin's Birthday";
      default:
        return '';
    }
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
          createdAtTime = format(date, 'hh:mm a');
          keyValueObject[key] = formattedDate;
        } else {
          keyValueObject[key] = value;
        }
      }
    });
  
    return { keyValueObject, createdAtTime };
  }
  
  
  
  
   Task : string | undefined; 
   projectName : string | undefined ;
   TaskCreator : string | undefined ;
   DueDate : string | undefined ;
   CreatedAt : string | undefined ;
   botId : any | undefined = ["66865ffe40d572d41b61a0db", "665d69fd110d2662a7e3e281"];
   previousTaskButton : boolean = true;
   nextTaskButton : boolean = true;
   unmeuteButtonIcon : boolean | undefined = false;
   meuteButtonIcon : boolean | undefined  = true;
   runingAlarmButtonIcon : boolean | undefined = false ;
 
  startCountdown(duration: number, message: string, botId :any): void{
this.botId = botId ;
localStorage.setItem('botIds', JSON.stringify(this.botId));
    // console.log("Hello console", botId )
    this.countdownMessage = 'Time starts now!';
    const result = this.parseStringToKeyValue(message);
    this.Task  = result.keyValueObject['Task'];
    this.projectName = result.keyValueObject['projectName'];
    this.TaskCreator = result.keyValueObject['Task Creator'] ? result.keyValueObject['Task Creator']  : result.keyValueObject['Creator'] ;
    this.DueDate = result.keyValueObject['Due Date']
    this.CreatedAt = result.keyValueObject['Created At']
    this.resultObjectClockInfo = result.keyValueObject;
    this.StartTimeClock = result.createdAtTime;
    // console.log(this.resultObjectClockInfo)
    if(this.meuteButtonIcon){
      this.alarmTop();
    }
    let totalSeconds = duration * 60; // 30 minutes in seconds

    this.countdownInterval = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.countdownMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
      this.countdownSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

      if (totalSeconds <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownMessage = 'Your time is up!';
      } else {
        totalSeconds--;
      }
    }, 1000);
  }

  TodayTaskArray : any = []
  getAllTodayEventArray(TodayTaskArray:any){
  
    // console.log("Today's Tasks Array in child component:", TodayTaskArray);
    this.TodayTaskArray = TodayTaskArray.sort((a:any , b:any) => a.start.getTime() - b.start.getTime());
    if (TodayTaskArray.length == 0) {
      this.countdownMessage = "Today's Task not available!";
    }else{
      
    
      // console.log(this.TodayTaskArray[0]['start'], " ------------ ")
      this.countdownMessage = `Your task will start at ${(getHours(this.TodayTaskArray[0]['start']))%12}:${getMinutes(this.TodayTaskArray[0]['start'])}.`
    }
  }



  previousTask(){
    let currentIndex = -1;
    if (!this.botId) {
      alert("Sorry your Task is not loaded!")
    }else{
      for (let i = 0; i < this.TodayTaskArray.length; i++) {
        const task = this.TodayTaskArray[i];
          if (this.botId[0] === task['id'][0] && this.botId[1] === task['id'][1] ) {
            currentIndex = i;
            break;
          }
        }
    }
  if (currentIndex >= 0) {
    const previousTask = this.TodayTaskArray[currentIndex - 1];
    this.botId = previousTask['id'];
    const result = this.parseStringToKeyValue(previousTask['title']);
    this.Task  = result.keyValueObject['Task'];
    this.projectName = result.keyValueObject['projectName'];
    this.CreatedAt = result.keyValueObject['Created At']
    this.StartTimeClock = result.createdAtTime;
    this.nextTaskButton = true;
  }else{
    this.previousTaskButton = false ;
   
  }
    // alert("previouse Task")
  }

  nextTast(){
    let currentIndex = -1;
    if (!this.botId) {
      alert("Sorry your Task is not loaded!")
    }else{
      for (let i = 0; i < this.TodayTaskArray.length; i++) {
        const task = this.TodayTaskArray[i];
        // for (let j = 0; j < this.botId.length; j++) {
          if (this.botId[0] === task['id'][0] && this.botId[1] === task['id'][1] ) {
            currentIndex = i;
            break;
          }
      }
    }
  if (currentIndex >= 0 && currentIndex < this.TodayTaskArray.length - 1) {
    const nextTask = this.TodayTaskArray[currentIndex + 1];
    this.botId = nextTask['id'];
    const result = this.parseStringToKeyValue(nextTask['title']);
    this.Task  = result.keyValueObject['Task'];
    this.projectName = result.keyValueObject['projectName'];
    this.CreatedAt = result.keyValueObject['Created At']
    this.StartTimeClock = result.createdAtTime;
    this.previousTaskButton = true;
  }else {
    this.nextTaskButton = false;
 
  }
  }

  reloadTask(){
    const storedBotIds = localStorage.getItem('botIds');
    let currentIndex = -1;
    let botId; 
    if (!storedBotIds) {
      alert("Sorry your Task is not loaded!")
    }else{
      for (let i = 0; i < this.TodayTaskArray.length; i++) {
        const task = this.TodayTaskArray[i];
        botId = JSON.parse(storedBotIds);
          if (botId[0] === task['id'][0] && botId[1] === task['id'][1] ) {
            currentIndex = i;
            break;
          }
      }
    }
    const nextTask = this.TodayTaskArray[currentIndex];
    this.botId = nextTask['id'];
    const result = this.parseStringToKeyValue(nextTask['title']);
    this.Task  = result.keyValueObject['Task'];
    this.projectName = result.keyValueObject['projectName'];
    this.CreatedAt = result.keyValueObject['Created At']
    this.StartTimeClock = result.createdAtTime;
    this.previousTaskButton = true;
    this.nextTaskButton = true;
  }


  unmeuteButton(){
    this.unmeuteButtonIcon  = false;
    this.meuteButtonIcon = true;
    this.runingAlarmButtonIcon  = false ;
  }
  meuteButton(){
    this.unmeuteButtonIcon  = true;
    this.meuteButtonIcon = false;
    this.runingAlarmButtonIcon  = false ;
  }

  alarmTop(){
    const alarmAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); 
    alarmAudio.play().catch(error => {
        // console.error('Error playing the audio:', error);
    });
    this.unmeuteButtonIcon  = false;
    this.meuteButtonIcon = false;
    this.runingAlarmButtonIcon  = true ;

    setTimeout(() => {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
        this.unmeuteButtonIcon  = false;
        this.meuteButtonIcon = true;
        this.runingAlarmButtonIcon  = false ;
    }, 30000); 
    // console.log("Hello console")
  }
}

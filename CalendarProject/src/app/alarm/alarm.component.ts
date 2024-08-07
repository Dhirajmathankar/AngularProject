import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.css'
})
export class AlarmComponent implements OnInit {
  hours: string | undefined;
  minutes: string | undefined;
  seconds: string | undefined;
  blnAmPm: string | undefined;
  dayOfWeek: string | undefined;
  ddMMoo: string | undefined;
  weeks: any[] = [];

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  suffixes = ["th", "st", "nd", "rd"];

  constructor() { }

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.getMonthWeeks();
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
}

import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'LandingPage';
  data :any ;
  thisVariable : string = "this is your value"
  testimonialsArray : any [] = []
  HowItWorklistArray : any [] = []

  constructor( private itemService : ItemService){}

  ngOnInit(){
    console.log("this is runing now")
    this.itemService.getlandingPageObject().subscribe(data =>{
      this.data = data ;
      const testimonialsList = this.data['testimonials'].testimonialsclientlist;
      this.splitArrayIntoChunks(testimonialsList, 2);
      const HowItWorklist = this.data['HowItWork'].HowItWorklist;
      this.splitArrayIntoChunksHowItWorklist(HowItWorklist, Math.round(HowItWorklist.length/2));
      // console.log(HowItWorklist, "    " , this.HowItWorklistArray)
    })
  }
  splitArrayIntoChunksHowItWorklist(array: any [], chunkSize: number){
    for (let i = 0; i < array.length; i += chunkSize) {
      this.HowItWorklistArray.push(array.slice(i, i + chunkSize));
    }
  }
  splitArrayIntoChunks(array: any [], chunkSize: number) {
    for (let i = 0; i < array.length; i += chunkSize) {
      this.testimonialsArray.push(array.slice(i, i + chunkSize));
    }
  }

  callNumber() {
    window.location.href = `tel:${this.data.callToAction}`;
  }
  checkImageFun(logo : string) : string {
    if(logo){
      return logo ;
    }else{ return "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
  }

  testobject(object : {}){
    console.log(object)
  }
}

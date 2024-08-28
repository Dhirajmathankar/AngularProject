import { Component ,  OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrl: './form-data.component.css'
})
export class FormDataComponent {
  constructor(private itemService: ItemService) {
    
  }

  optionlist : any = [];

  ngOnInit() {
    this.itemService.getFormOptions('667ba2438cecd3682bab034a').subscribe(data => {
      data[0].tasklistArray.forEach((value: any) => {
        this.optionlist.push(value)
      });
      console.log(data[0].tasklistArray + "  " + this.optionlist);
    });
  }
  selectedOptions : any = [];
  showFormData : any = false;
  submitform(){
    this.selectedOptions = [];
    const selectElement = document.getElementById('multi-select') as HTMLSelectElement;
    for (let i = 0; i < selectElement.selectedOptions.length; i++) {
          this.selectedOptions.push(selectElement.selectedOptions.item(i)?.value);
    }
    if (this.optionlist.length == this.selectedOptions.length) {
      this.showFormData = !this.showFormData;
    }else{
      alert("Please select all option")
    }
  }

}

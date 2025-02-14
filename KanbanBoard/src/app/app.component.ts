import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './item.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

interface ValidationItem {
  botId: string;
  statusName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements AfterViewInit {

  title = 'Kanban';
  countCompleteTask : number = 0
  eventId: any = '';
  tasks: any[] = [];
  statusNameArray: any = []
  items: any = [];
  UniqueDataStatus: any = {}
  Active_status: any;
  itemListObject : object = {}
  optionlistdropdown: any = [];
  XmandatorySetCss: boolean = false;
  validationArray : any = []
  sucessAlert : boolean = false;
  Alert : boolean = false;
  data: any = {};
  scrollInterval: any;
  scrollStep = 50;

  @ViewChild('boardContainer') boardContainer!: ElementRef;


  constructor(private itemService: ItemService, private renderer: Renderer2) {
    this.ngOnInit()
  }

  ngAfterViewInit() {
    const container = this.boardContainer.nativeElement;
    container.addEventListener('dragover', (event: DragEvent) => {
      this.handleDragOver(event, container);
    });
    container.addEventListener('dragleave', () => {
      this.stopScrolling();
    });
    container.addEventListener('drop', () => this.stopScrolling());
  }

  handleDragOver(event: DragEvent, container: HTMLElement) {
    const { clientX } = event;
    const rect = container.getBoundingClientRect();
    if (clientX < rect.left + 50) {
      this.startScrolling(container, 'left');
    } else if (clientX > rect.right - 50) {
      this.startScrolling(container, 'right');
    } else {
      this.stopScrolling();
    }
  }

  startScrolling(container: HTMLElement, direction: 'left' | 'right') {
    if (this.scrollInterval) {
      return;
    }
    this.scrollInterval = setInterval(() => {
      if (direction === 'left') {
        container.scrollLeft -= this.scrollStep;
      } else {
        container.scrollLeft += this.scrollStep;
      }
    }, 50);
  }

  stopScrolling() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  getType(item: any): string {
    return typeof item;
  }

  getTaskColor(taskColor: string) {
    if (taskColor == 'inProgress') {
      return 'green'
    } if (taskColor == 'End') {
      return 'red'
    } else {
      return 'orange'
    }
  }

  ngOnInit() {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      // this.itemListObject = data[0].tasklist;
      // this.items[0].ProjectstatusNameArray[this.items[0].ProjectstatusNameArray.length - 1]
    });
  }

  getTaskStatuses() {
    return Object.keys(this.UniqueDataStatus);
  }

  getValueTasklistUnique(mapIndex: any) {
    return this.UniqueDataStatus[mapIndex];
  }

  getcolumnName(itemkey: string) {
    return itemkey.toString()
  }

  ParseDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const formattedDateTime = `${day}-${month}-${year}`;
    return formattedDateTime;
  }


  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, task: any, eventId: string, templateId: string, botId: string) {

    this.eventId = eventId;
    this.XmandatorySetCss = true;
    this.itemService.getBotIdForValidation(botId).subscribe(data => {
      this.Alert = false
      this.sucessAlert = true ;
      // this.validationArray = data.data
      const resData :any = data.data;
     console.log(resData)
      const objectMap = new Map(resData.map((obj: { botId: { toString: () => any; }; })  => [obj.botId.toString(), obj]));
      console.log(objectMap , "this is your ")
		const stackStoreBotId = new Map();
		const manualCategoryObjects = new Map();
		// const botId = botId;
		const stack = [{ botId, successorIndex: 0 }];

		while (stack.length > 0) {
			const current = stack[stack.length - 1];
			const currentObject: any = objectMap.get(current.botId);
console.log(currentObject, " currentObject -- ")
			if (!currentObject) {
				stack.pop();
				if (stack.length > 0) {
					stack[stack.length - 1].successorIndex++;
				}
				continue;
			}

			if (currentObject['category'] === "" || currentObject.category === undefined) {
				stack.pop();
				if (stack.length > 0) {
					stack[stack.length - 1].successorIndex++;
				}
				continue;
			}

			if (currentObject.category === "Manual" && currentObject.botId.toString() !== botId) {
				manualCategoryObjects.set(currentObject.botId.toString(), {'botId':currentObject.botId.toString(), "statusName":currentObject.statusName.toString()});
			}

			while (currentObject.successor.length > 0 && current.successorIndex < currentObject.successor.length) {
				const nextBotId = currentObject.successor[current.successorIndex].toString();
				const nextObject : any = objectMap.get(nextBotId);

				if (!nextObject) {
					current.successorIndex++;
					continue;
				}

				if (nextObject.category === "Manual" ) {
					manualCategoryObjects.set(nextObject.botId.toString(), {'botId':nextObject.botId.toString(), "statusName":nextObject.statusName.toString()});
					stack.pop();
					if (stack.length > 0) {
						stack[stack.length - 1].successorIndex++;
					}
					break;
				}

				stackStoreBotId.set(current.botId, currentObject.successor.map((s: { toString: () => any; })  => s.toString()));
				stack.push({ botId: nextBotId, successorIndex: 0 });
				break;
			}

			if (current.successorIndex >= currentObject.successor.length) {
				stack.pop();
				if (stack.length > 0) {
					stack[stack.length - 1].successorIndex++;
				}
			}
		}
    this.validationArray = Array.from(manualCategoryObjects.values()) ;
    console.log("this is your manual category", manualCategoryObjects , "    " , this.validationArray);

    })

    setTimeout(()=>{
     this.sucessAlert = false
    }, 10000)
    event.dataTransfer?.setData("text/plain", task.id);
  }




  showColumnNameInAlert = ""
  drop(event: DragEvent, columnId: string) {
    this.XmandatorySetCss = false;
    event.preventDefault();
    const data = event.dataTransfer?.getData("text/plain");

    const foundItem = this.validationArray.find((validationArrayItem: ValidationItem) => validationArrayItem.statusName === columnId);
    if (foundItem ) {
      this.itemService.updateTaskStatus(columnId, this.eventId, foundItem.botId).subscribe(data =>{
      });
      this.ngOnInit();
    } else {
      this.sucessAlert = false
      this.Alert = true;
      this.showColumnNameInAlert = columnId
      setTimeout(()=>{
        this.Alert = false
       }, 5000)
    }
  }

  capitalizeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  getCountCompleteTask(tasklist : any){
    this.countCompleteTask = 0;
    // console.log(this.itemListObject, "undefine", tasklist, )
    for(let valueoftasklist of tasklist){
      if (valueoftasklist.statusName == this.items[0].ProjectstatusNameArray[this.items[0].ProjectstatusNameArray.length - 1]) {
        ++this.countCompleteTask;
      }
    }
    return this.countCompleteTask ;
  }

}




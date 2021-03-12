import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  public items1: any = [];
  public items: any = [];
  public items3: any = [];
  public items4: any = [];

  constructor() {
    this.items1 = [
      { expanded: false },
     
    ];
    this.items = [
      { expanded: false },
     
    ];
    this.items3 = [
      { expanded: false },
     
    ];
    this.items4 = [
      { expanded: false },
     
    ];
   }


//item1
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items1.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  //item1

  //item2
  expandItem2(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  //item2

  //item3
  expandItem3(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items3.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  //item3

  //item4
  expandItem4(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items4.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  //item4

  

}

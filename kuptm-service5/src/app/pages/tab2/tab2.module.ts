import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from "@angular/router";
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ExpandableComponent } from "./../../components/expandable/expandable.component";
import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    RouterModule.forChild([
      {
        path: "",
        component: Tab2Page
      }
    ])
  ],
  declarations: [Tab2Page, ExpandableComponent]
})
export class Tab2PageModule {}

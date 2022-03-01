import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuEditorRoutingModule } from './menu-editor-routing.module';
import { MenuEditorComponent } from './menu-editor.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';


@NgModule({
  declarations: [
    MenuEditorComponent,
    MenuCardComponent
  ],
  imports: [
    CommonModule,
    MenuEditorRoutingModule
  ]
})
export class MenuEditorModule { }

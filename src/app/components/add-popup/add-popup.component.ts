import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent implements OnInit {

  title: string = "";
  name: string = "";
  price: number;

  constructor(public dialogRef: MatDialogRef<AddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.title = data.title;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {

    this.dialogRef.close();

  }

  addItem(): void {
    if(this.name === ""){ // return if name not entered
      alert("Please enter name.");
      return;
    }

    this.dialogRef.close({name: this.name, price: this.price});
  }

}

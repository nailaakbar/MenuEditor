import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPopupComponent } from '../components/add-popup/add-popup.component';

@Component({
  selector: 'app-menu-editor',
  templateUrl: './menu-editor.component.html',
  styleUrls: ['./menu-editor.component.scss']
})
export class MenuEditorComponent implements OnInit {

  menu =[];

  sections = [];
  items = [];
  options = [];
  choices = [];

  selectedMenu = [];
  selectedItem = [];
  selectedOptions = [];
  selectedChoices = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // get data from API
    this.menu = [{
      "sections": [
        {
          "id": 1,
          "name": "Lunch Specials",
          "items": [
            {
              "id": 1,
              "title": "Chicken Over Rice",
              "price": 12,
              "options": [
                {
                  "id": 1,
                  "name": "Add Rice",
                  "choices": [
                    {
                      "id": 1,
                      "name": "White Rice",
                      "price": 2
                    },
                    {
                      "id": 2,
                      "name": "Brown Rice",
                      "price": 2
                    }
                  ]
                }
              ]
            },
            {
              "id": 2,
              "title": "Chicken Over Rice1",
              "price": 121,
              "options": [
                {
                  "id": 2,
                  "name": "Add Rice1",
                  "choices": [
                    {
                      "id": 3,
                      "name": "White Rice1",
                      "price": 2
                    },
                    {
                      "id": 4,
                      "name": "Brown Rice1",
                      "price": 2
                    }
                  ]
                }
              ]
            }
          ],
        },
        {
          "id": 2,
          "name": "Lunch Specials2",
          "items": [
            {
              "id": 2,
              "title": "Chicken Over Rice2",
              "price": 12,
              "options": [
                {
                  "id": 3,
                  "name": "Add Rice2",
                  "choices": [
                    {
                      "id": 5,
                      "name": "White Rice2",
                      "price": 2
                    },
                    {
                      "id": 6,
                      "name": "Brown Rice2",
                      "price": 2
                    }
                  ]
                }
              ]
            },
          ]
        },
      ]
    }]

    this.sections = this.menu[0].sections;
  }

  // load sub-menus as per click
  loadItems(item, i) {

    switch (i) {
      case 1:
        break;
      case 2: // load items as per sections
        this.selectedMenu = item;
        this.sections.forEach(x => x["isActive"] = false); // reset already selected section

        this.items = item.items; 
        if (this.items !== undefined && this.items.length > 0) {
          this.items.forEach(x => x["isActive"] = false) // reset already selected item
        }
        item["isActive"] = true;

        // reset selected item and sub-menus (options and choices)
        this.selectedItem = []
        this.selectedOptions = []
        this.options = []
        this.choices = []
        break;

      case 3:
        this.items.forEach(x => x["isActive"] = false); // reset already selected item

        this.selectedItem = item; // selected item
        this.options = item.options; //load options as per selected item
        if (this.options !== undefined && this.options.length > 0) {
          this.options.forEach(x => x["isActive"] = false) // reset already selected option
        }
        item["isActive"] = true;
        console.log(this.selectedMenu)

        // reset selected options and sub-menu (choices)
        this.selectedOptions = [];
        this.choices = []
        break;
      case 4:
        this.options.forEach(x => x["isActive"] = false); // reset already selected option

        this.selectedOptions = item;
        this.choices = item.choices; //load choices as per selected option
        if (this.choices !== undefined && this.choices.length > 0) {
          this.choices.forEach(x => x["isActive"] = false) // reset already selected choices
        }
        item["isActive"] = true;
        break;

      case 5:
        this.choices.forEach(x => x["isActive"] = false); // reset already selected choices
        item["isActive"] = true;
        break;

      default:
        break;
    }


  }

  // add new item as per selected menu
  addItem(item, i) {

    // set popup title
    var title = "Menu";
    if (i === 2) {
      title = "Items"
    }
    else if (i === 3) {
      title = "Options"
    }
    else if (i === 4) {
      title = "Choices"
    }
    //open popup
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '600px',
      height: '300px',
      disableClose: true,
      data: {
        title: title
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result !== null && result !== undefined) { // add result if exists

        switch (i) {
          case 1: // add section
            var count = this.sections.length + 1;
            this.sections.push({ "id": count, "name": result.name, "items": [] })

            break;
          case 2: // add item in selected section
            if (this.selectedMenu !== undefined && Object.keys(this.selectedMenu).length > 0) {
              console.log(this.selectedMenu)
              if (this.items === undefined) {
                this.items = [];
              }

              var count = this.items.length + 1;
              this.items.push({ "id": count, "title": result.name, "price": result.price, "options": [] });
            }
            break;

          case 3: // add option in selected item
            if (this.selectedItem !== undefined && Object.keys(this.selectedItem).length > 0) {
              if (this.options === undefined) {
                this.options = [];
              }

              var count = this.options.length + 1;
              this.options.push({ "id": count, "name": result.name, "choices": [] })
            }
            break;
          case 4: // add choices in selected option
            if (this.selectedOptions !== undefined && Object.keys(this.selectedOptions).length > 0) {
              if (this.choices === undefined) {
                this.choices = [];
              }

              var count = this.items.length + 1;
              this.choices.push({ "id": count, "name": result.name, "price": result.price })
            }
            break;

          default:
            break;
        }
      }
    });
  }

}

import { Inject, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


import { Pet } from '../interfaces/index';
import { GetPetList, CreatePet } from '../actions/index';
import { PetState } from '../state/index';
import { PetsService } from '../services/index';


@Component({
  templateUrl: 'pets.html',
  styleUrls:['shared.css', 'pets.css']
})
export class PetsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private store: Store
  ){
    this.pets$.subscribe((pets: Pet[])=> {
      this.pets = pets
    })
  }
  pets: Pet[] = [];
  @Select(PetState.pets) pets$!: Observable<Pet[]>
  displayedColumns: string[] = ['name', 'status'];
  filter: 'available' | 'pending' | 'sold' = 'available'

  ngOnInit(){
    this.getPetList(this.filter);
  }

  getPetList (status: 'available' | 'pending' | 'sold' = 'available') {
    this.store.dispatch(new GetPetList(status))
  }

  openDialog(data: any): void {
    const dialogs: any[] = [ PetsDialog ];
    const dialogRef = this.dialog.open(PetsDialog, {
      width: '500px',
      data: data,
    });

    const subscription = dialogRef.componentInstance.onSave.subscribe(() => {
      this.getPetList();
    });

    dialogRef.afterClosed().subscribe(result => {
      subscription.unsubscribe();
      console.log('The dialog was closed');
    });
  }
}

@Component({
  templateUrl: 'pets-dialog.html',
  styleUrls:['shared.css']
})
export class PetsDialog {
  constructor(
    private dialogRef: MatDialogRef<PetsDialog>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  urls: Set<string> = new Set([]);
  tags: Set<string> = new Set([]);
  petPhoto: string = this.data.photoUrls ? this.data.photoUrls[0] : '';
  status: 'available' | 'pending' | 'sold' = 'available';
  pet?: Pet;
  category: string = '';
  name: string = '';
  @Output() onSave = new EventEmitter();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  setPetPhoto(url: string) {
    this.petPhoto = url;
  }

  removeChip(url: string, chipSet: Set<string>) {
    chipSet.delete(url);
  }

  addChipFromInput(event: MatChipInputEvent, chipSet: Set<string>) {
    // TODO: write validation to ensure only valid urls are entered
    if (event.value) {
      chipSet.add(event.value);
      event.chipInput!.clear();
    }
  }

  createPet() {
    // TODO: filter out duplicate tags and categories before saving
    this.pet = {
      name: this.name,
      status: this.status,
      photoUrls: [...this.urls],
      tags: [...this.tags].map( (tag, index)=> { return {id: index, name: tag}}),
      category: {id: 0, name: this.category}
    }
    this.store.dispatch(new CreatePet(this.pet)).subscribe(
      (pet) => {
        this.pet = pet;
        this.onSave.emit(pet);
        this.dialogRef.close();
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

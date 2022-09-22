import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Pet } from '../interfaces/index';
import { CreatePet, GetPetList } from '../actions/index';
import { PetsService } from '../services/index';

export interface PetStateModel {
  pets: Pet[];
}

@State<PetStateModel>({
  name: 'pet',
  defaults: {
    pets: []
  }
})
@Injectable()
export class  PetState {

  constructor(private petsService: PetsService){}

  @Selector()
  static pets(state: PetStateModel) {
    return state.pets
  }

  @Action(GetPetList)
  getList({ patchState, dispatch }: StateContext<PetStateModel>, { filter }: GetPetList) {
    return this.petsService.getPetList(filter)
    .pipe(
      tap(pets => {
        patchState({pets: pets});
      })
    )
  }

  @Action(CreatePet)
  create({ getState, patchState, dispatch }: StateContext<PetStateModel>, { pet }: CreatePet) {
    const state = getState();
    return this.petsService.createPet(pet)
    .pipe(
      tap(pet => {
        patchState({pets: [...state.pets, pet]});
      })
    )
  }
}

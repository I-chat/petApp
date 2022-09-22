 import { Pet } from '../interfaces/index';

export class CreatePet {
  static readonly type = '[PET] Create';

  constructor(public pet: Pet) {}
}

export class GetPetList {
  static readonly type = '[PET] Get List';
  constructor(public filter: 'available' | 'pending' | 'sold' = 'available') {}
}

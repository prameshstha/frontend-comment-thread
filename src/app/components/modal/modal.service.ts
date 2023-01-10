import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  @Input() showModal: boolean = false;
  constructor() {}
  getShowModal() {
    return this.showModal;
  }
  openModalService() {
    this.showModal = true;
    return this.showModal;
  }
  closeModalService() {
    this.showModal = false;
    return this.showModal;
  }
}

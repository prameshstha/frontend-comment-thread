import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}
  @Input() modalClose: Function;
  @Output() closeEmit = new EventEmitter();
  @Output() finalDeleteEmit = new EventEmitter();

  onCancelClick() {
    this.closeEmit.emit();
  }
  onDeleteClick() {
    this.finalDeleteEmit.emit();
  }
}

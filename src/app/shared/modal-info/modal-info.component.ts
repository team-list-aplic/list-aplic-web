import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'list-aplic-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {

  @Input() title?: string;
  @Input() message?: string;
  @Input() innerHTML?: string;
  @Input() modalRef: BsModalRef;

  constructor() {
  }
}

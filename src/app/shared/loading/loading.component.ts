import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'list-aplic-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private readonly _lodadingService: LoadingService) { }

  ngOnInit() {
  }

  get processing(): boolean {
    return this._lodadingService.processing;
  }

  get message(): string {
    return this._lodadingService.message;
  }

}

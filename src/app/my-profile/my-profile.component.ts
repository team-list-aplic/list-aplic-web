import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Student } from "../models/student.model";
import { LoginService } from "../services/login.service";
import { NotificationsService } from "angular2-notifications";
import { LoadingService } from "../services/loading.service";
import { Statistic } from "../models/statistic.model";
import { StatisticsService } from "../services/statistics.service";

@Component({
  selector: 'list-aplic-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  loggedUser: Student = {};
  modalRef: BsModalRef;
  statistics: Statistic = { topFiveQuestions: [{ name: 'x', counter: 2 }, { name: 'xx', counter: 3 }] };

  constructor(private readonly _loginService: LoginService,
              private readonly _loadingService: LoadingService,
              private readonly _notificationsService: NotificationsService,
              private readonly _modalService: BsModalService,
              private readonly _statisticsService: StatisticsService,
  ) {
  }

  ngOnInit() {
    this.loggedUser = this._loginService.readLoggedUser();
  }

  async openStatisticsModal(template: TemplateRef<any>) {
    try {
      this._loadingService.processing = true;
      this.statistics = await this._statisticsService.getTopQuestionsByInstructor(this.loggedUser.id || '');
      this._modalService.config.class = "modal-lg";
      this.modalRef = this._modalService.show(template);
    } catch (error) {
      (error.error.fieldErrors || []).forEach(error => {
        this._notificationsService.error('Ocorreu um erro', error.message, { timeOut: 3000 });
      });
    } finally {
      this._loadingService.processing = false;
    }
  }
}

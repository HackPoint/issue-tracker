import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../services/issues.service';
import { Issue } from '../interfaces/issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  showReportIssue = false;
  showEditIssue = false;
  issues: Issue[] = [];
  selectedIssue: Issue | null = null;

  constructor(private readonly issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.getIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

  private getIssues() {
    this.issues =
      this.issueService.getPendingIssues();
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../services/issues.service';
import { Issue } from '../interfaces/issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Input() issue: Issue | null = null;
  @Output() formClose = new EventEmitter();

  issueForm: FormGroup | undefined;
  suggestions: Issue[] = [];

  constructor(private readonly builder: FormBuilder,
              private readonly issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required]
    });

    if (this.issue) {
      this.issueForm.setValue({
        title: this.issue.title,
        description: this.issue.description,
        priority: this.issue.priority,
        type: this.issue.type
      });
    }

    this.issueForm.controls['title'].valueChanges.subscribe((title: string) => {
      this.suggestions =
        this.issueService.getSuggestions(title);
    });
  }


  addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit();
  }

}

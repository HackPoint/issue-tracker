import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssuesService } from '../services/issues.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../interfaces/issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {
  issueForm: FormGroup | null = null;
  suggestions: Issue[] = [];
  @Input() issue: Issue | null = null;
  @Output() formClose = new EventEmitter();

  constructor(
    private readonly builder: FormBuilder,
    private readonly issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: [this.issue?.title, Validators.required],
      description: [this.issue?.description, Validators.required],
      priority: [this.issue?.priority, Validators.required],
      type: [this.issue?.type]
    });

    this.issueForm.controls['title'].valueChanges.subscribe((title: string) => {
      this.suggestions =
        this.issueService.getSuggestions(title);
    });

  }


  save() {
    if (this.issue) {
      this.issueService.updateIssue(this.issue.issueNo, this.issueForm?.value);
      this.formClose.emit();
    }
  }
}

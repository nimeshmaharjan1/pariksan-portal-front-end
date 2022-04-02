import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent implements OnInit {
  constructor(
    protected dialogRef: NbDialogRef<DifficultyComponent>,
    private spinner: NgxSpinnerService
  ) {}
  difficultyLevel;
  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  submit(difficultyLevel: any) {
    this.dialogRef.close(difficultyLevel);
  }
}

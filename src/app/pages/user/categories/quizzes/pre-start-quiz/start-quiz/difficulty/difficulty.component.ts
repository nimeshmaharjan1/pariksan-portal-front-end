import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private spinner: NgxSpinnerService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  difficultyLevel;
  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['user-dashboard/0']);
    this.dialogRef.close();
  }

  submit(difficultyLevel: any) {
    if (difficultyLevel == null) {
      this.snackbar.open('Please select a difficulty level', 'OK');
      return;
    } else {
      this.dialogRef.close(difficultyLevel);
    }
  }
}

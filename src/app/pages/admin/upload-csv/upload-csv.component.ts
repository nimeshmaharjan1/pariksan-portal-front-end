import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../../services/file-upload.service';
import { QuestionService } from '../../../services/question/question.service';
@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss'],
})
export class UploadCsvComponent implements OnInit {
  shortLink: string = '';
  file;
  isFileSelected = false;
  constructor(
    private fileUploadService: FileUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    this.isFileSelected = true;
  }

  // OnClick of button Upload
  onUpload() {
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;
      }
      Swal.fire(
        'Success',
        'The file has been sucessfully uploaded.',
        'success'
      ).then((e) => {
        this.router.navigate(['admin/categories']);
      });
    });
  }
}

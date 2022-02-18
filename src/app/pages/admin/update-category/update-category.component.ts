import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  categoryFromApi;
  categoryIdUrl;
  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
    
    ) { }

  ngOnInit(): void {
    this.getCategoryId();
    this.getCategoryData();
  }

  getCategoryId() {
   this.categoryIdUrl = this.route.snapshot.params['categoryId'];
  }

  getCategoryData() {
    this.categoryService.getCategory(this.categoryIdUrl).subscribe(
      {
        next: (data:any) => {
          this.categoryFromApi = data;
          console.log(data);
          
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  formSubmit() {
    this.categoryService.updateCategory(this.categoryFromApi).subscribe(
      {
        next: (data:any) => {
          Swal.fire('Success', 'The category has been successfully updated.', 'success').then(
            (e) => {
              this.router.navigate(['admin/categories'])
            }
          );
        },
        error: (err) => {
          Swal.fire('Error', 'Something went wrong, please try again.', 'error');
        }
      }
    )
  }

}

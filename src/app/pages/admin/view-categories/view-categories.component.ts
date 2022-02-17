import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {
  categories = [];
  addCategoryForm = {
    title: '',
    description: '',
  }
  categoriesDataFromApi = [];

  public flipped;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe({
      
      next: (data: any) => {
        this.categories = data;
        Swal.fire('Success', 'The categories have been successfully fetched.', 'success');
      },
      error: (error) => {
        console.log(error);
        //Error
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in loading data.'});
      }
    }
    )
    
  }

  formSubmit() {
    if (this.addCategoryForm.title.trim() === '' || this.addCategoryForm.title === null) {
      Swal.fire({
        icon: 'info',
        title: 'Title cannot be blank.',});
        return;
    }

    //ADD CATEGORY
    this.categoryService.addCategory(this.addCategoryForm).subscribe(
      {
        next: (data: any) => {
          Swal.fire('Success','The category has been successfully added.','success');
          setTimeout(()=>{
            window.location.reload();
          }, 3000)
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error','Please try again.','error');
        }
      }
    )
  }

  deleteCategory(categoryId) {
    
    this.categoryService.deleteCategory(categoryId).subscribe(
      {
        next: (data:any) => {
          Swal.fire('Success','The category has been successfully deleted.','success');
          setTimeout(()=>{
            window.location.reload();
          }, 3000)
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error','Please try again.','error');
          
        }
      }
    )
  }

  toggleFlip() {
    this.flipped = !this.flipped;
  }

}

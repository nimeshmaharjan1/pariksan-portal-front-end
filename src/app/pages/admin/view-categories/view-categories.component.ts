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

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe({
      
      next: (data: any) => {
        this.categories = data;
        console.log('data ', this.categories);
        this.categoriesDataFromApi = this.categories;
      },
      error: (error) => {
        console.log(error);
        //Error
        console.log(error)
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in loading data.'});
      }
    }
    )
    console.log('categoriesfromaapi: ', this.categoriesDataFromApi);
    
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
    console.log(categoryId);
    
    this.categoryService.deleteCategory(categoryId).subscribe(
      {
        next: (data:any) => {
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

}

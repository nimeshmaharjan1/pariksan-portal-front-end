import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  theme:any;
  constructor(private themeService: NbThemeService) { }

  ngOnInit(): void {
    this.themeService.onThemeChange().subscribe({
      next: (data:any) => {
        console.log(data);
        this.theme = data;
      }
    })
  }

}

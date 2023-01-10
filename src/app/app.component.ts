import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // constructor(private http: HttpClient) {}
  console = console;
  title = 'comments';

  // ngOnInit() {
  //   let headers = new HttpHeaders({});
  //   this.http
  //     .get<any>(
  //       'https://praprimus.azurewebsites.net/api/lpt//laptop-features/',
  //       {
  //         headers: headers,
  //       }
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
}

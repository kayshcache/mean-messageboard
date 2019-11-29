import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = '';
  
  constructor(private http: HttpClient) {
  } 

  ngOnInit() { 
	  this.http.get('http://localhost:3000/api/message').toPromise();
  }

  post() {
	console.log('post', this.message);
	this.http.post('http://localhost:3000/api/message', this.message).toPromise();
  }
}

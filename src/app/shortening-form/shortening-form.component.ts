import { Component, Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shortening-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shortening-form.component.html',
  styleUrl: './shortening-form.component.scss'
})
@Injectable({providedIn: 'root'})
export class ShorteningFormComponent {
  private http = inject(HttpClient);
  inputError = false
  shortenedResults: {originalUrl: string, newUrl: string}[] = []
  urlForm =  new FormGroup({
    url: new FormControl('')
  })

  constructor() {
    this.urlForm.valueChanges.subscribe(changes => {
      if (changes.url && changes.url.trim()) { // text input present and it's not whitespace
        this.inputError = false; // hides the input error if it was previously displayed
      }
    })
  }

  onSubmit(event: FormDataEvent) {
    event.preventDefault();

    if (!this.urlForm.value.url || !this.urlForm.value.url.trim()){ // no text input or it's just whitespace
      this.inputError = true // display input error
      return
    }

    const ORIGINAL_URL = this.urlForm.value.url;

    this.http.post<{data: {tiny_url: string}, code: number; errors: string[]}>(
      "https://api.tinyurl.com/create",
      {
        "url": this.urlForm.value.url,
      },
      {
        headers: {'Authorization': `Bearer invalid-key`},
      }).subscribe(responseBody => {
        console.log(responseBody.errors)
        this.shortenedResults.push({originalUrl: ORIGINAL_URL, newUrl: responseBody.data.tiny_url});
    })

    
  }
}

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
      if (changes.url && changes.url.trim()) {
        this.inputError = false;
      }
    })
  }

  onSubmit(event: FormDataEvent) {
    event.preventDefault();
    if (!this.urlForm.value.url || !this.urlForm.value.url.trim()){
      this.inputError = true
      return
    }
    // const resourceUrl = `https://crossorigin.me/https://cleanuri.com/api/v1/shorten/?url=${encodeURIComponent(this.urlForm.value.url)}`
    this.http.post<{"result_url": string; "error": string}>('https://spoo.me/', 'string', {params: {url: this.urlForm.value.url}}).subscribe(response => {
      console.log(response)
    })

    this.shortenedResults.push({originalUrl: this.urlForm.value.url, newUrl: this.urlForm.value.url});
  }
}

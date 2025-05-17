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
  errorOccured = false
  errorMsg = ""

  shortenedResults: {originalUrl: string, newUrl: string, copied: boolean}[] = []

  urlForm =  new FormGroup({
    url: new FormControl('')
  })

  constructor() {
    this.urlForm.valueChanges.subscribe(changes => {
      if (changes.url && changes.url.trim()) { // text input present/changed and it's not whitespace
        this.errorOccured = false; // hides the input error if any was previously displayed
        this.errorMsg = ""
      }
    })
  }

  // truncates the text parameter to 35 characters if longer
  trimTextIfTooLong(text: string) {
    if (text.length > 35) {
      return text.slice(0, 35) + "..."
    }else {
      return text
    }
  }

  // form submit event handler
  onSubmit(event: FormDataEvent) {
    event.preventDefault();
    if (!this.urlForm.value.url || !this.urlForm.value.url.trim()){ // no text input or it's just whitespace
      this.errorOccured = true // display input error
      this.errorMsg = "Please add a link"
      return;
    }
    this.errorOccured = false; // hides the input error if any was previously displayed
    this.errorMsg = ""
    this.getAndDisplayShortenedUrl(this.urlForm.value.url)
  }

  getAndDisplayShortenedUrl(originalUrl: string) {
    this.http.post<{data: {tiny_url: string}, errors: string[]}>(
      "https://api.tinyurl.com/create",
      {"url": this.urlForm.value.url},
      // auth token for the api is only hard-coded here to make it easier for my supervisor
      // to reproduce the dev environment when doing code reviews as this project is a solution to a challenge
      {headers: {'Authorization': `Bearer tWvqPoxhE4MuPcTYjDZnPvVcIw8aSpSQntIakdqmICeL50dweV0vSbwUdpEL`}}

    ).subscribe({
      next: (responseBody) => {
        this.shortenedResults.push({originalUrl: this.trimTextIfTooLong(originalUrl), newUrl: responseBody.data.tiny_url, copied: false});
      },
      error: (error) => {
        this.errorOccured = true
        if (error.status) { // must be some sort of http error from the api e.g. Invalid auth token (401)
          this.errorMsg = "Internal Application Error. Please try again!"
        }else {
          this.errorMsg = "Something went wrong. please check your internet connection and try again"
        }
      }
    })
  }

  async copyLink(event: MouseEvent) {
    const linkId = (event.target as HTMLButtonElement)!.id
    const shortUrlObj = this.shortenedResults.find((result) => result.newUrl == linkId)!
    if (shortUrlObj.copied)
      return;
    navigator.clipboard.writeText(shortUrlObj.newUrl)
    .then(() => shortUrlObj.copied = true)
    .catch(err => console.error(err.message))
  }
}

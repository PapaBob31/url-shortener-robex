import { Component, inject, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuVisible: boolean = false; // controls the visisbility of the menu on screens with small widths

  constructor() {
    const elementRef = inject(ElementRef);

    /* Add 'Click' event listener to the app component such that the menu is closed if anywhere on the screen is clicked */
    elementRef.nativeElement.addEventListener("click", ()=>{
      this.menuVisible = false
    })
  }

  toggleMenuVisibility(event: MouseEvent): void {
    event.stopPropagation()
    this.menuVisible = !this.menuVisible;
  }

}

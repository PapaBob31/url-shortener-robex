import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component"
import { HeroSectionComponent } from "./hero-section/hero-section.component"
import { ShorteningFormComponent } from "./shortening-form/shortening-form.component"
import { FeaturesComponent } from "./features/features.component"
import { SubfooterComponent } from "./subfooter/subfooter.component"
import { FooterComponent } from "./footer/footer.component"

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroSectionComponent, ShorteningFormComponent, FeaturesComponent, SubfooterComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'url-shortener-weeek-3';
}

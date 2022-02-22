import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GlitchListComponent } from './glitch-list/glitch-list.component';
import { JoinusSectionComponent } from './joinus-section/joinus-section.component';
import { NtfListingComponent } from './ntf-listing/ntf-listing.component';
import { DokkodoSectionComponent } from './dokkodo-section/dokkodo-section.component';
import { AboutusPageComponent } from './aboutus-page/aboutus-page.component';
import { PartnersPageComponent } from './partners-page/partners-page.component';
import { JoinCompanyPageComponent } from './join-company-page/join-company-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GlitchListComponent,
    JoinusSectionComponent,
    NtfListingComponent,
    DokkodoSectionComponent,
    AboutusPageComponent,
    PartnersPageComponent,
    JoinCompanyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

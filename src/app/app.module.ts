import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppErrorHandler } from './core/services/app-error-handler.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './core/services/http-error.interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GlitchListComponent } from './glitch-list/glitch-list.component';
import { JoinusSectionComponent } from './joinus-section/joinus-section.component';
import { NtfListingComponent } from './ntf-listing/ntf-listing.component';
import { DokkodoSectionComponent } from './dokkodo-section/dokkodo-section.component';
import { AboutusPageComponent } from './aboutus-page/aboutus-page.component';
import { PartnersPageComponent } from './partners-page/partners-page.component';
import { JoinCompanyPageComponent } from './join-company-page/join-company-page.component';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS,metaReducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRootStore from './core/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
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
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Cyber Ronins',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(fromRootStore.effects),
    CarouselModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

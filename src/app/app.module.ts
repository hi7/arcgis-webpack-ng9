import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EsriMapComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
})
export class AppModule { }

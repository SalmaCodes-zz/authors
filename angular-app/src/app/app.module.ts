import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewComponent,
    EditComponent,
    QuotesComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

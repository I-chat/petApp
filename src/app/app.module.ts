import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, PetsComponent, PetsDialog } from "./shared/index";
import { AuthService, CookieService } from "./services/index";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PetsComponent,
    PetsDialog
  ],
  imports: [
    BrowserModule, MatTableModule,
    AppRoutingModule, MatSelectModule,
    HttpClientModule, MatInputModule,
    FormsModule, MatChipsModule,
    BrowserAnimationsModule,
    MatIconModule, MatCardModule,
    MatDialogModule,
    DialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

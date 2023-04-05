import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { CompletedTasksComponent } from './pages/completed-tasks/completed-tasks.component';
import { LoaderModule } from './components/loader/loader.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, EditTaskComponent, CompletedTasksComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

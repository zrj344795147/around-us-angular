// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing';
import { AgmCoreModule} from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/home.component';
import { EventDetailComponent } from './components/EventDetail/event-detail.component';
import { EventPostComponent } from './components/EventPost/event-post.component';
// Services
import { EventsService } from './services/events.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EventDetailComponent,
        EventPostComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA895-jWHSZUww1OaXBJeb6xSXveFSBulg',
            language: 'en-US'
        })
    ],
    providers: [
        EventsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

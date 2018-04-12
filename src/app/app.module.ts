// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing';
import { AgmCoreModule} from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/home.component';
// Services
import { EventsService } from './services/events.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA895-jWHSZUww1OaXBJeb6xSXveFSBulg'
        })
    ],
    providers: [
        EventsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

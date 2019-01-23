import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ChatComponent } from './chat/chat.component';

import { HttpClientModule } from '@angular/common/http';
import { ChatbotService } from './chatbot.service';
import { ActionComponent } from './action/action.component';
import { CarouselComponent } from './carousel/carousel.component'


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    ChatComponent,
    ActionComponent,
    CarouselComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private chatbotService : ChatbotService){
  }
 }

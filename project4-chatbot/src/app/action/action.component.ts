import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../action';
import { ChatbotService } from '../chatbot.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})

export class ActionComponent implements OnInit {
  
  constructor(public chatbotService: ChatbotService,
    public chatComponent: ChatComponent) { }

  ngOnInit() {
  }



}

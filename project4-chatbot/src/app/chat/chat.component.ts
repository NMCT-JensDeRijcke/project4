import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { Message } from '../message'
import { Action } from '../action';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  // actions: Action[] = [];
  actionsVisible: Boolean;
  constructor(public chatbotService: ChatbotService) { }

  ngOnInit() {
  }
  
  onSendMessage(newMessage: string): void {
    if (newMessage !== ""){
      this.messages.push({
        sender: "user",
        value: newMessage
      })
  
      this.scrollDown(200)
      
      this.chatbotService.sendMessage(newMessage);
      setTimeout(() => {
        var result = this.chatbotService.getMessage()
        console.log(result);
        this.messages.push(result);
        window.scrollTo(0, document.body.scrollHeight);
  
    
      }, 4000);
  
      this.scrollDown(4200)
      
      setTimeout(() => { 
        // console.log("STAP1: " + this.chatbotService.actions[0].title)
  
        if (this.chatbotService.actions.length !== 0){
          this.actionsVisible = false;
        }else{
          this.actionsVisible = true;
        }
      }, 4200);
    }
  }
  

  scrollDown(delay: number){
    setTimeout(() => {
      window.scrollTo(0,document.body.scrollHeight);
    }, delay);
  }

  
}


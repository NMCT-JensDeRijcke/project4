import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message'
import { Action } from './action';
import { ActionComponent } from './action/action.component';
import { Carousel } from './carousel';
// import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  actions: Action[] = [];
  carousels: Carousel[] = [];

  constructor(
    private http: HttpClient,
  )
  {
    console.log('The service has started.')
    this.init();
  }

  private startConversationUrl = "https://directline.botframework.com/v3/directline/conversations";
  private conversationId = ""
  private conversationToken = ""
  private conversationUrl = ""
  private messageUrl = "";
  private headers;
  /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }

  init() {
    //getConversationKey
    var headers = new HttpHeaders({
      'Authorization' : 'Bearer xhL2Qu4nW34.cwA.0qY.XSjSFHspEKWLoyjGUA4gROSi5z-gVx5KBSOabDVd_qI'
    })
    
    this.http.post(this.startConversationUrl, null, {headers: headers})
    .subscribe(
      data =>{
        this.conversationId = data["conversationId"];
        this.conversationToken = data["token"];
        console.log(data);
      },
      err=>{
        console.log(err.message);
      }
    )
    // return this.http.post(this.startConversationUrl, null, {headers: this.headers})
    // this.conversationKey = JSON.stringify(this.http.post(this.startConversationUrl, null, {headers: this.headers}));
    // console.log(this.conversationKey);
    
  }

  sendMessage(message){
    // console.log("sendMessage: " + message);
    // console.log("conversationtoken: " + this.conversationToken + " conversationID: " + this.conversationId);
    this.actions = []
    
    this.headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + this.conversationToken,
      'Content-Type' : 'application/json'
    })

    const body = { type : "message", from : { id : "user1" }, text : message}
    
    this.conversationUrl = "https://directline.botframework.com/v3/directline/conversations/" + this.conversationId + "/activities" 
    this.http.post(this.conversationUrl, body, {headers: this.headers}).subscribe()
    // console.log("einde versturen message");

  }

  
  getMessage(): Message{

    var currentMessage: Message;
    // console.log("get messages");
    currentMessage = {sender: "bot", value: ""}
    this.http.get(this.conversationUrl, {headers: this.headers}).subscribe(
      res=>{
        // console.log("#####res#####");
        console.log(res);
        var LastMessage = res["watermark"];
        // console.log(res["activities"][botMessage]["from"]["id"])

        if (res["activities"][LastMessage]["from"]["id"] === "EventBotProject"){
          currentMessage.value = res["activities"][LastMessage]["text"];
          // console.log("the message: " + currentMessage);
        } else {
          currentMessage.value = "That's not quite what was planned! :o"
        }
        if (res["activities"][LastMessage]["suggestedActions"]){
          this.getActions(res, LastMessage)
        }
        if (res["activities"][LastMessage]["attachmentLayout"]){
          if (res["activities"][LastMessage]["attachmentLayout"] == "carousel"){
            this.getAttachments(res, LastMessage)

          }
        }

        console.log("##############################");
      }
    );
    return currentMessage
  }


  getActions(res: Object, LastMessage){
    var currentAction: Action;
    
    var amountActions = res["activities"][LastMessage]["suggestedActions"]["actions"].length;
    // console.log(amountActions)
    for (let i = 0; i < amountActions; i++) {
      console.log('forloop: ', res["activities"][LastMessage]["suggestedActions"]["actions"][i]["value"])          
      currentAction = {
        type: res["activities"][LastMessage]["suggestedActions"]["actions"][i]["type"],
        title: res["activities"][LastMessage]["suggestedActions"]["actions"][i]["title"],
        value: res["activities"][LastMessage]["suggestedActions"]["actions"][i]["value"]
      }
      this.actions.push(currentAction)
    
    }
    // console.log("currentAction.value: ", currentAction.value)


    this.actions.forEach(action => {
      console.log("ACTION IN LIST: ", action)
    });
  }

  getAttachments(res: Object, LastMessage) {
    var currentCarousel: Carousel;

    var amountAttachments = res["activities"][LastMessage]["attachments"].length;

    for (let i = 0; i < amountAttachments; i++) {
      currentCarousel = {
        title: res["activities"][LastMessage]["attachments"][i]["content"]["title"],
        subtitle: res["activities"][LastMessage]["attachments"][i]["content"]["subtitle"],
        text: res["activities"][LastMessage]["attachments"][i]["content"]["text"],
        imgUrl: res["activities"][LastMessage]["attachments"][i]["content"]["images"][0]["url"],
        btnUrl: res["activities"][LastMessage]["attachments"][i]["content"]["buttons"][0]["value"]
      }
      
      this.carousels.push(currentCarousel)
    }
    this.carousels.forEach(carousel => {
      console.log("CAROUSEL IN LIST: ", carousel)
    });

  }
}

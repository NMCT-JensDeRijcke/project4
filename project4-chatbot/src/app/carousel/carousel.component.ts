import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { Carousel } from '../carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  carousels: Carousel[] = [];
  selectedCarousel: Carousel;
  currentSelectedCarousel: number;

  constructor(public chatbotService: ChatbotService) { }

  ngOnInit() {
    this.carousels = this.chatbotService.carousels;
    this.currentSelectedCarousel = 0;
  }

  previousClicked(){
    if (this.currentSelectedCarousel > 0){
      this.currentSelectedCarousel--
    }
  }
  
  nextClicked(){
    console.log("currentSelectedCarousel: ", this.currentSelectedCarousel);
    console.log("lengthCarousels: ", this.carousels.length);

    if (this.currentSelectedCarousel < this.carousels.length-1){
      this.currentSelectedCarousel++
    }
  }

  btnBuyClicked(url:string){
    window.open(url);
  }
  
}

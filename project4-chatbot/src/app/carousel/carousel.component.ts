import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { Carousel } from '../carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  selectedCarousel: Carousel;
  currentSelectedCarousel: number;

  constructor(public chatbotService: ChatbotService) { }

  ngOnInit() {
    this.currentSelectedCarousel = 0;
  }

  previousClicked(){
    this.currentSelectedCarousel--
  }
  
  nextClicked(){
    console.log("currentSelectedCarousel: ", this.currentSelectedCarousel);
    this.currentSelectedCarousel++
    
  }

  btnBuyClicked(url:string){
    window.open(url);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/service.index';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( public _chatService: ChatService ) {
    
  }

  ngOnInit() {
  }


}

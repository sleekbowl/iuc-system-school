import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(
    public _chatService: ChatService
  ) {
    console.log("Aqui es el global de la aplicacion")
  }

  ngOnInit() {
    init_plugins();
  }

}

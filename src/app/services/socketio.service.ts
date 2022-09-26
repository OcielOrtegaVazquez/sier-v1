import { Injectable, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;
  readonly url: string = 'https://localhost:3000/admin/';

  constructor() { 
    this.socket = io(this.url);
  }

  webSocketConnect(){
    return this.socket;
  }

  listen(eventName:string){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return new Observable((subscriber)=>{
      this.socket.OnInit(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.socket.emit(eventName,data);
  }

}

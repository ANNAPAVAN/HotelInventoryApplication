import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = []


  headers = new HttpHeaders({token:"qwert12345w"});
  getRooms$ = this.http.get<RoomList[]>('/api/rooms',
    {headers: this.headers}
  ).pipe(shareReplay(1))

  constructor(private http: HttpClient,@Inject(APP_SERVICE_CONFIG) private config: AppConfig) { 
    console.log("Api End Point  ",environment.apiEndpoint); 
    console.log("Api endpoint ", this.config.apiEndpoint)
  }


  // constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig) { 
  //   console.log("Api endpoint ", this.config.apiEndpoint)
  // }

  getRooms(){
    //  return this.roomList; 
    return this.http.get<RoomList[]>('/api/rooms')
  }

  addRoom(room: RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room,{headers: this.headers});
  }

  editRoom(room: RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room)
  }

  deleteRoom(id: string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos(){
    const request = new HttpRequest(
      "GET",
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true
      }
    );
    return this.http.request(request);
  }

}

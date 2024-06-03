import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule,
    RoomsListComponent,
    HeaderComponent,
    RouterOutlet,
    ReactiveFormsModule
  ], 
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css' 
})
export class RoomsComponent implements OnInit ,DoCheck , AfterViewInit, AfterViewChecked{

  hotelName = "Hilton Hotel";
  numberOfRooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms : 10,
    bookedRooms: 5
  }
  roomList: RoomList[] = []
  priceFilter = new FormControl(100000) 

  stream = new Observable(observer => {
    observer.next("user1");
    observer.next("user2");
    observer.next("user3");
    observer.complete();
    // observer.error("error");
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  // @ViewChildren to access multiple components
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;


  totalBytes = 0;

  subscription! : Subscription;

  error$: Subject<string> = new Subject<string>;

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err)=>{
      this.error$.next(err.message);
      return of([]);
    })
  )

  roomCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  )


  

  constructor(@SkipSelf() private roomsService: RoomsService,
        private configService: ConfigService   
  ) {}

  ngOnInit():void {

    this.roomsService.getPhotos().subscribe((event)=>{
      switch(event.type){
        case HttpEventType.Sent:{
          console.log("Request Has been Made!");
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log("Request Success");
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+= event.loaded;
          break;
        }
        case HttpEventType.Response: {
          // console.log(event.body);
        }
      }
    })

    this.stream.subscribe({
      next: (data) => console.log(data),
      complete: () => console.log("completed"),
      error: (error) => console.log(error)
    })
    this.stream.subscribe((data) => console.log(data))

    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // })
  }

  ngAfterViewChecked(): void {
    // console.log("ngAfterViewChecked");
  }
  ngAfterViewInit(): void {
    // console.log("-------------------",this.headerComponent); // gives info about header component
    // this.headerComponent.title! = "ROOMS VIEW";

    this.headerChildrenComponent.last.title="Last Title"
    // console.log(this.headerChildrenComponent.last.title="Last Title");
  }
  ngDoCheck(): void {
    // ngOnChanges and ngDoCheck not application on a same component at a time
    // console.log("do check called") // executed every time when we do any change in our application
  }



  toggle(){
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList){
    // console.log(room);
    this.selectedRoom = room;
  }

  addRoom(){
    const room:RoomList = {
      // roomNumber: '4',
      roomType:"Deluxe44",
      amenities:"Air conditioner, Free wifi, Tv",
      price: 400,
      photoes: "http://www.decorationlove.com/wp-content/uploads/2016/07/Living-Room-Design-Ideas.jpg",
      checkinTime: new Date('13-may-2024'),
      checkoutTime: new Date('17-may-2024'),
      rating:4.72145
    }

    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data)=>{
      this.roomList = data;
    })
  }

  editRoom(){
    const room:RoomList = {
      roomNumber: '3',
      roomType:"Deluxe333",
      amenities:"Air conditioner, Free wifi, Tv",
      price: 400,
      photoes: "http://www.decorationlove.com/wp-content/uploads/2016/07/Living-Room-Design-Ideas.jpg",
      checkinTime: new Date('13-may-2024'),
      checkoutTime: new Date('17-may-2024'),
      rating:4.72
    }

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  
  deleteRoom(){
    this.roomsService.deleteRoom('3').subscribe((data)=>{
      this.roomList = data;
    })
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}

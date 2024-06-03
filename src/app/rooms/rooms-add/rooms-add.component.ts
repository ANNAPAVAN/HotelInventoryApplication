import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.css'
})
export class RoomsAddComponent implements OnInit {
  


  room: RoomList={
    roomType: '',
    amenities: '',
    price: 0,
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photoes: '',
    rating: 0
  }

  successMessage: string = '';

  constructor(
    private roomService: RoomsService
  ) {
    
  }
  ngOnInit(): void {

  }

  AddRoom(roomsForm: NgForm){
    this.roomService.addRoom(this.room).subscribe((data)=> {
      this.successMessage = "Room Added Successfully";
      // roomsForm.reset();
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        price: 0,
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photoes: '',
        rating: 0
      })
    })
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[] , maxPrice: number): RoomList[] {
    return rooms.filter((room) => room.price < maxPrice);
  }
  

}

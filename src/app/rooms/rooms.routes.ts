import { Routes } from "@angular/router";
import { RoomsComponent } from "./rooms.component";
import { RoomsAddComponent } from "./rooms-add/rooms-add.component";
import { RoomsBookingComponent } from "./rooms-booking/rooms-booking.component";
import { roomGuard } from "./guards/room.guard";


export const RoomRoutes: Routes = [
    // { path: 'rooms/add', component: RoomsAddComponent},

    { path:'', component: RoomsComponent,
        canActivateChild: [roomGuard],
        children: [
            { path: 'add', component: RoomsAddComponent},
            // { path: ':id', component: RoomsBookingComponent},
        ]
    },
    
    
]; 
 
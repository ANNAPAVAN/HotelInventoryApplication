import { Routes } from "@angular/router";
import { BookingComponent } from "./booking.component";
import { bookingGuard } from "./guards/booking.guard";



export const BookingRoutes: Routes = [
    // { path: 'booking', component: BookingComponent}   

    { path:'', component: BookingComponent,
        children: [{ path: '', component: BookingComponent}]
        // children: [{ path: '', component: BookingComponent, canDeactivate:[bookingGuard]}]
    },
    
];
 
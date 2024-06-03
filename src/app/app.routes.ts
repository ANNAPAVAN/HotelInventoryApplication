import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { loginGuard, loginLoad } from './guards/login.guard';

export const routes: Routes = [
    { 
        path: 'employee', 
        component: EmployeeComponent, 
        canActivate: [loginGuard], 
        canMatch: [loginLoad] 
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { 
        path: 'rooms', 
        loadChildren: () => 
            import('./rooms/rooms.routes').then(m => m.RoomRoutes), 
        canActivate: [loginGuard], 
        canMatch: [loginLoad] 
    },
    { 
        path: 'booking/:id', 
        loadChildren: () => 
            import('./booking/booking.routes').then(m => m.BookingRoutes), 
        canActivate: [loginGuard], 
        canMatch: [loginLoad] 
    },  
    { path: 'comment', loadChildren: () => import('./comment/comment.routes').then(m => m.CommentRoutes)},
    { path: '**', component: NotfoundComponent }
];

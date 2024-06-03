import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rooms-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.css'
})
export class RoomsBookingComponent implements OnInit {


  id!: number;

  // id$ =  this.router.params.pipe(
  //   map(params => params['id'])
  // )

  id$ =  this.router.paramMap.pipe(
    map(params => params.get("id"))
  )


  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {

    // this.id = this.router.snapshot.params['id'];

    // this.router.params.subscribe((params) => {
    //   this.id = params['id'];
    // })



  }
}

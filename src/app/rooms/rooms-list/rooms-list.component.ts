// rooms-list.component.ts

import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomList } from '../rooms';
import { RouterModule } from '@angular/router';
import { FilterPipe } from "../filter.pipe";

@Component({
    selector: 'app-rooms-list',
    standalone: true,
    templateUrl: './rooms-list.component.html',
    styleUrls: ['./rooms-list.component.css'],
    imports: [CommonModule, RouterModule, FilterPipe]
})
export class RoomsListComponent implements OnInit , OnChanges, OnDestroy{
  @Input() rooms: RoomList[] = [];

  @Input() title: string = '';

  @Input() maxPrice: any = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {}
  ngOnDestroy(): void {
    console.log("OnDestroy called")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  ngOnInit(): void {}

  selectRoom(room: RoomList): void {
    this.selectedRoom.emit(room);
  }
}

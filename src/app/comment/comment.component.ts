import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{

  comments$: any = this.commentService.getComments();

  constructor(private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ){
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => console.log("-----",data));
  }
}


import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comments } from '../comment';
import { Observable } from 'rxjs';

export const commentGaurd: ResolveFn<Comments[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Comments[]> | Promise<Comments[]> => {
  const commentService = inject(CommentService);
  return commentService.getComments();
};



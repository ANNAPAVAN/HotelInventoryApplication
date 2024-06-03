import { Routes } from "@angular/router";
import { CommentComponent } from "./comment.component";
import { commentGaurd } from "./guard/comment.guard";
import { loginGuard } from "../guards/login.guard";

export const CommentRoutes: Routes = [

    { path:'', component: CommentComponent,
        children: [{ path: '',
         component: CommentComponent,
         canActivate: [loginGuard],
         resolve: { comments: commentGaurd}
        }]
    },
];
 
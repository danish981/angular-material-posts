import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from "@angular/material/button";
import { PostDetailDialogComponent } from "../post-detail-dialog/post-detail-dialog.component";
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    RouterLink,
    DatePipe
  ],
  templateUrl : './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.postService.getPost(id).subscribe({
        next: (post) => this.post = post,
        error: (err) => console.error('Error fetching post:', err)
      });
    } else {
      // todo : use a toast instead
      console.error('Invalid post ID.');
    }
  }

  openDialog(): void {
    if (this.post) {
      this.dialog.open(PostDetailDialogComponent, {
        data: { post: this.post },
        width: '600px',
        maxWidth: '90vw',
        panelClass: 'post-detail-dialog'
      });
    }
  }

}
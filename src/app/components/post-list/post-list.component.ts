import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostDetailDialogComponent } from "../post-detail-dialog/post-detail-dialog.component";
import { SlicePipe } from "@angular/common";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    SlicePipe
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  posts: Post[] = [];
  dataSource = new MatTableDataSource<Post>(this.posts);
  displayedColumns: string[] = ['id', 'title', 'slug', 'excerpt', 'description', 'is_published', 'created_at', 'actions'];
  private postService = inject(PostService);
  private dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.reverse();
      this.dataSource.data = this.posts;
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts().subscribe(posts => {
        this.posts = posts;
        this.dataSource.data = this.posts;
      });
    });
  }

  openPostDetail(post: Post): void {
    // todo : show a gentle toast message instead
    if (!post) {
      console.error('No post data available.');
      return;
    }

    this.dialog.open(PostDetailDialogComponent, {
      data: { post: post },
      width: '600px',
      maxWidth: '90vw',
      panelClass: 'post-detail-dialog'
    });
  }
}
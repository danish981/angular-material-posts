import { Component, Inject, inject } from '@angular/core';
import { Post } from '../../models/post.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { DatePipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-post-detail-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCard,
    MatIcon,
    MatIconButton,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatSlideToggle,
    DatePipe
  ],
  templateUrl: './post-detail-dialog.component.html',
  styleUrls: ['./post-detail-dialog.component.css']
})

export class PostDetailDialogComponent {
  protected dialogRef = inject(MatDialogRef<PostDetailDialogComponent>);
  private router = inject(Router);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { post: Post }) { }

  navigateToEdit(): void {
    this.dialogRef.close();
    this.router.navigate(['/edit', this.data.post.id]).then(() => {
      console.log('Navigated to edit page');
    });
  }
}
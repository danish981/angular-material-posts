import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatSlideToggle,
    MatButton,
    NgIf,
    MatError
  ],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  post: Post | undefined;

  private postService = inject(PostService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      excerpt: ['', Validators.required],
      description: ['', Validators.required],
      is_published: [false]
    });
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.postService.getPost(id).subscribe({
        next: (post) => {
          this.post = post;
          if (post) {
            this.postForm.patchValue(post);
          } else {
            this.toast.showToast('Post not found.', 'error');
          }
        },
        error: (err) => {
          console.error('Error fetching post:', err);
          this.toast.showToast('Error loading post. Please try again.', 'error');
        }
      });
    } else {
      this.toast.showToast('Invalid post ID.', 'error');
    }
  }

  onSubmit(): void {
    if (this.postForm.valid && this.post) {
      const updatedPost: Post = {
        ...this.post,
        ...this.postForm.value,
        updated_at: new Date()
      };

      this.postService.updatePost(updatedPost).subscribe({
        next: () => {
          this.router.navigate(['/']).then(r => console.log('Navigation result:', r));
          this.toast.showToast('Post updated successfully!', 'success');
        },
        error: (err) => {
          console.error('Error updating post:', err);
          this.toast.showToast('Error updating post. Please try again.', 'error');
        }
      });
    } else {
      this.toast.showToast('Please fill all required fields.', 'warning');
    }
  }

  onCancel(): void {
    this.router.navigate(['/']).then(r => console.log('Navigation result:', r));
    this.toast.showToast('Edit canceled.', 'warning');
  }

}
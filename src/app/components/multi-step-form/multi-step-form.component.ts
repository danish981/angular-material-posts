import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatStep, MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Step1Component } from "../multi-step-post-form/step1/step1.component";
import { Step2Component } from "../multi-step-post-form/step2/step2.component";

@Component({
  selector: 'app-multi-step-post-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatStep,
    MatStepper,
    Step1Component,
    Step2Component
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})

export class MultiStepPostFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  masterForm: FormGroup = this.fb.group({
    step1: this.fb.group({
      title: '',
      slug: ''
    }),
    step2: this.fb.group({
      excerpt: '',
      description: '',
      is_published: [false]
    })
  });

  activeStepIndex = 0;
  isLinear = true; // Enable linear stepper (must complete each step before moving forward)

  ngOnInit(): void {
    // todo : show a gentle nice message that child components are loaded
  }

  get step1Form(): FormGroup {
    return this.masterForm.get('step1') as FormGroup;
  }

  get step2Form(): FormGroup {
    return this.masterForm.get('step2') as FormGroup;
  }

  nextStep(): void {
    if (this.activeStepIndex < 1 && this.masterForm.controls[this.getStepName()].valid) {
      this.activeStepIndex++;
    }
  }

  previousStep(): void {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
    }
  }

  onSubmit(): void {
    if (this.masterForm.valid) {
      const post: Post = {
        id: 0, // Will be generated by PostService or backend (todo: get latest ID and increment)
        title: this.step1Form.get('title')?.value,
        slug: this.step1Form.get('slug')?.value,
        excerpt: this.step2Form.get('excerpt')?.value,
        description: this.step2Form.get('description')?.value,
        is_published: this.step2Form.get('is_published')?.value,
        created_at: new Date(),
        updated_at: new Date()
      };

      this.postService.addPost(post).subscribe({
        next: () => {
          this.router.navigate(['/']).then(r => console.log('Navigation result:', r));
        },
        error: (err) => console.error('Error creating post:', err)
      });
    }
  }

  private getStepName(): string {
    return `step${this.activeStepIndex + 1}`;
  }
}
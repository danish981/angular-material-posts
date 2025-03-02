import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private snackBar = inject(MatSnackBar);

  showToast(message: string,
    type: ToastType = 'success',
    action: string = 'Close',
    config: MatSnackBarConfig = {}): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [this.getPanelClass(type)]
    };

    const finalConfig: MatSnackBarConfig = { ...defaultConfig, ...config };
    this.snackBar.open(message, action, finalConfig);
  }

  private getPanelClass(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'snack-bar-success';
      case 'warning':
        return 'snack-bar-warning';
      case 'error':
        return 'snack-bar-error';
      default:
        return 'snack-bar-success';
    }
  }
}
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalOptions } from '../../interfaces/dialogs.interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      options: ModalOptions;
      type: 'confirmation' | 'info';
    }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }
}

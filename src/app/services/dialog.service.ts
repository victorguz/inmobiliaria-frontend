import { Observable, Subject } from 'rxjs';

import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  DialogPosition,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { ModalOptions, SpinnerMessageOptions } from '../interfaces/dialogs.interfaces';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef!: MatDialogRef<any, any>;
  private spinnerRef!: MatDialogRef<any, any>;

  constructor(protected dialog: MatDialog, private router: Router) {}

  /**
   * @description muestra un dialog dependiendo el tipo seleccionado
   */
  public dialogComponent<T>(body: {
    component: ComponentType<any>;
    data?: any;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    updatePosition?: DialogPosition;
    panelClass?: string | string[];
    disableClose?: boolean;
    dontCloseOtherModals?: boolean;
  }) {
    if (!body.dontCloseOtherModals && this.dialogRef)
      this.dialogRef.close(undefined);
    let subject = new Subject<T>();

    this.dialogRef = this.dialog.open(body.component, {
      data: body.data,
      width: body.width ?? '550px',
      minWidth: body.minWidth ?? '28vw',
      maxWidth: body.maxWidth ?? '90vw',
      height: body.height ?? 'fit-content',
      minHeight: body.minHeight ?? '200px',
      maxHeight: body.maxHeight ??  '90vh',
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: false,
      disableClose: body.disableClose ?? true,
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: body.panelClass ?? 'dialog-panel',
    });
    body.updatePosition && this.dialogRef.updatePosition(body.updatePosition);

    this.dialogRef.afterClosed().subscribe((result: any) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * @description muestra un dialog dependiendo el tipo seleccionado
   */
  private genericDialog(
    options: ModalOptions,
    type: 'confirmation' | 'info',
    color: 'primary' | 'danger'
  ): Observable<boolean> {
    return this.dialogComponent({
      component: DialogComponent,
      width: '400px',
      height: '300px',

      data: { options, type, color },
    });
  }

  /**
   * @description shows confirmation dialog
   */
  dialogConfirmation(options: ModalOptions) {
    return this.genericDialog(options, 'confirmation', 'primary');
  }

  /**
   * @description shows informative dialog
   */
  dialogInformation(options: ModalOptions) {
    return this.genericDialog(options, 'info', 'primary');
  }

  /**
   * @description shows a spinner dialog on the corner
   */
  public showNotification(options: SpinnerMessageOptions) {
    if (this.spinnerRef) this.spinnerRef.close(undefined);
    let subject = new Subject<boolean>();

    this.spinnerRef = this.dialog.open(SpinnerComponent, {
      data: { options },
      panelClass: 'dialog-spinner',
      maxWidth: '400px',
      minWidth: '280px',
      autoFocus: false,
      hasBackdrop: false,
      closeOnNavigation: false,
      disableClose: true,
      position: {
        top: '1rem',
        right: '1rem',
      },
    });

    this.spinnerRef.afterClosed().subscribe((result: boolean) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * notification success
   * @param message
   * @param title
   * @returns
   */
  showSuccess(message?: string) {
    return this.showNotification({
      message: message ?? 'Consulta exitosa',
      color: 'text-success',
      icon: 'check_circle',
      timeoutMillis: 5000,
    });
  }

  /**
   * notification error
   * @param message
   * @param title
   * @returns
   */
  showError(message?: string) {
    return this.showNotification({
      message: message ?? 'Ocurrió un error al realizar esta acción',
      color: 'text-danger',
      icon: 'error',
      timeoutMillis: 5000,
    });
  }

}

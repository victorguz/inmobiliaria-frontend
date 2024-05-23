export interface ModalOptions {
  message: string;
  title?: string;
  image?: string;
  cancelText?: string;
  okText?: string;
  icon?: string;
  alertClass?:
    | 'alert-info'
    | 'alert-danger'
    | 'alert-warning'
    | 'alert-success';
}

export interface SpinnerMessageOptions {
  message: string;
  title?: string;
  timeoutMillis?: number;
  icon?: 'error' | 'warning' | 'help' | 'check_circle';
  color?: 'text-danger' | 'text-warning' | 'text-info' | 'text-success';
}

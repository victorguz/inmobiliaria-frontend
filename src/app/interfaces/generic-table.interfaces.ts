export interface GenericTableColumn<T> {
  name: keyof T | 'actions';
  isSortable?: boolean;
  dontPrintValue?: boolean;
  renderHTML?: boolean;
  title?: string;
  render?: (row: T) => string;
  actions?: GenericAction<T>[];
  maxLength?: number;
}
export class GenericAction<T> {
  imagen?: string;
  text?: string;
  icon?: string | ((row: T) => string) = 'check';
  disabled?: boolean | ((row: T) => boolean);
  isNotButton?: boolean;
  tooltip?: string;
  tooltipPosition?: 'left' | 'right' | 'above' | 'below' | 'before' | 'after' =
    'above';
  action?: (row: T) => any;
  actions?: GenericAction<T>[];
}

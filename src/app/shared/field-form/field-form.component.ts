import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss'],
})
export class FieldFormComponent implements OnInit, OnChanges {
  /**
   * Formulario que contiene el campo a modificar
   */
  @Input() form!: FormGroup;
  /**
   * Nombre del campo a modificar en el formulario
   */
  @Input() name!: string;
  /**
   * Etiqueta de titulo del campo
   */
  @Input() label!: string;
  /**
   * Placeholder del campo
   */
  @Input() placeholder: string = '';
  /**
   * matIconPrefix del campo
   */
  @Input() matIconPrefix: string = '';
  /**
   * Definir matIconPrefix como botón
   */
  @Input() isPrefixButton?: boolean = false;
  /**
   * Función que se ejecutará al presionar el matIconPrefix
   */
  @Input() prefixFunction?: Function;
  /**
   * matIconSuffix del campo
   */
  @Input() matIconSuffix: string = '';
  /**
   * Definir matIconSuffix como botón
   */
  @Input() isSuffixButton?: boolean = false;
  /**
   * Return de suffixFunction
   */
  @Output() clickSuffix: EventEmitter<any> = new EventEmitter();
  /**
   * Color del icono de suffix o prefix
   */
  @Input() iconColor: string = '#000000';
  /**
   * Ocultar el label hint que se muestra debajo del campo
   */
  @Input() hideHint: boolean = false;

  /**
   * texto del error que se va a mostrar
   */
  @Input() error?: string;

  /**
   * Tipos de control de formulario.
   */
  @Input() type:
    | 'email'
    | 'text'
    | 'number'
    | 'date'
    | 'checkbox'
    | 'toggle'
    | 'select'
    | 'password'
    | 'textarea' = 'text';

  /**
   * largo maximo del campo de texto
   */
  @Input() maxLength!: string | number;

  /**
   * aviso del campo de texto
   */
  @Input() tooltip!: string;
  @Input() includeSeconds?: boolean = true;
  @Input() readonly?: boolean = false;
  @Input() showLabel?: boolean = true;
  @Input() background?: 'white' | 'light' = 'light';

  @Input() items: any[] = [];
  @Input() bindValue: string = 'value';
  @Input() bindLabel: string = 'name';

  ngOnChanges(changes: SimpleChanges): void {
    this.placeholder = this.placeholder ?? this.label ?? this.name;
  }

  ngOnInit(): void {}

  /**
   * Si el campo form[name] tiene validación de requerido
   */
  isRequired = () =>
    this.form.get(this.name)?.hasValidator(Validators.required);

  setMaxLength = () => {
    if (!this.maxLength && this.form?.get(this.name)?.errors?.['maxlength']) {
      this.maxLength = this.form?.get(this.name)?.errors?.[
        'maxlength'
      ]?.requiredLength??30
    }
  };

  onClickSuffix() {
    this.clickSuffix.emit(null);
  }

  get field() {
    return this.form?.get(this.name);
  }

  get isDate() {
    return this.type == 'date';
  }

  get isText() {
    return ['text', 'email'].includes(this.type);
  }
  get isNumber() {
    return this.type == 'number';
  }

  get isSelect() {
    return this.type == 'select';
  }

  get isCheckbox() {
    return this.type == 'checkbox';
  }
  get isToggle() {
    return this.type == 'toggle';
  }

  get isField() {
    return !['checkbox', 'toggle'].includes(this.type);
  }

  get isPassword() {
    return this.type == 'password';
  }

  get isTextArea() {
    return this.type == 'textarea';
  }
}

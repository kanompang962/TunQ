import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input()
  set isDisabled(value: boolean) {
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Input()
  set textGroup(value: string) {
    this.isInputGroup = true;
    this.inputGroupMessage = value;
  }

  @Input()
  set iconGroup(value: string) {
    this.isInputGroupIcon = true;
    this.inputGroupIcon = value;
  }

  @Input()
  set error(value: any) {
    this.isError = false;
    this.errorMessage = '';

    // if (value) {
    //   this.isError = true;
    //   this.errorMessage = new ErrorMessage().getErrorMessage(value);
    // }
  }

  // @Input() name = GenerateRandom(6);
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() readonly = false;
  @Input() label!: string;
  @Input() customMask!: string;
  @Input() mask!: string;
  @Input() dropSpecialCharacters!: true;
  @Input() thousandSeparator!: string;
  @Input() max!: number;
  @Input() min!: number;

  @Input() autocomplete = '';

  @Output() valueChange = new EventEmitter();


  form = new FormControl();
  isInputGroup = false;
  isInputGroupIcon = false;
  inputGroupMessage = '';
  inputGroupIcon = '';
  subscription!: Subscription;
  errorMessage = '';
  errorMessageApi = '';
  isRequired = false;
  isError = false;
  isErrorApi = false;

  onChange = (value: string) => { };
  onTouched = (value: string) => { };

  constructor() { }

  ngOnInit() {
    this.subscription = this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((val) => {
      let value = this.form.value;
      if (typeof this.form.value === 'string') {
        value = this.form.value.trim();
      }
      if (this.max && value > this.max) {
        value = this.max;
        setTimeout(() => {
          this.form.patchValue(value, { emitEvent: false });
        });
      }
      if (this.min && value < this.min) {
        value = this.min;
        setTimeout(() => {
          this.form.patchValue(value, { emitEvent: false });
        });
      }
      this.valueChange.emit(value);
      this.onChange(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.form.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  /**
   *
   * @Validate
   */

  isString(value: any) {
    return typeof value === 'string';
  }

  /**
   *
   * @SetValue
   */

  setTrimString() {
    if (this.isString(this.form.value)) {
      this.form.patchValue(this.form.value.trim());
    }
  }
}

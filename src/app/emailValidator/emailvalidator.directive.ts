import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: EmailvalidatorDirective, multi: true}]

})
export class EmailvalidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = control.value as string;

    if(typeof(value) == "string" && value.includes('test')){
      return {
        invalidError: true
      }
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    
  }

}

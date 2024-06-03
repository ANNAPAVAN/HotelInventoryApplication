import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidatorComponent {
  
    static ValidateName(control: AbstractControl){
       const value = control.value as string;
       if(value.includes('test')){
        return{
          invalidName: true
        }
       }
       return null
    }

    static ValidateSpecialChar(char: string){ 
      return (control: AbstractControl) => {
      const value = control.value as string;
      if(value.includes(char)){
        return {
          invalidSpecialChar: true 
        }
      }
      return null
    }
  }

  static ValidateDate(control: FormGroup) {
    const checkinDateValue = control.get('checkinDate')?.value;
    const checkoutDateValue = control.get('checkoutDate')?.value;
  
    if (checkinDateValue && checkoutDateValue) {
      const checkinDate = new Date(checkinDateValue);
      const checkoutDate = new Date(checkoutDateValue);
  
      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
        // If either date is invalid, set an error on both controls or handle it as needed
        control.get('checkinDate')?.setErrors({ invalidDate: true });
        control.get('checkoutDate')?.setErrors({ invalidDate: true });
        return { invalidDate: true };
      }
  
      if (checkinDate >= checkoutDate) {
        control.get('checkoutDate')?.setErrors({ invalidDate: true });
        return { invalidDate: true };
      } else {
        // Clear errors if the date is valid
        control.get('checkoutDate')?.setErrors(null);
      }
    }
  
    return null;
  }
}

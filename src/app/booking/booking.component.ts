import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ChangeDetectionStrategy } from "@angular/core";
import { CustomValidatorComponent } from './validators/custom-validator/custom-validator.component';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-booking',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'] 
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  get guests(){
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService,
              private fb: FormBuilder,
              private bookingService: BookingService,
              private route: ActivatedRoute
            ) {}
  
  

  ngOnInit(): void { 

    const roomIdd = this.route.snapshot.paramMap.get('id');
    console.log("roomId---->",roomIdd)

    this.bookingForm = this.fb.group({ 
      roomId: new FormControl({ value:roomIdd, disabled: true},[Validators.required]),
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['',[Validators.required,
         Validators.minLength(5), 
         CustomValidatorComponent.ValidateName,
         CustomValidatorComponent.ValidateSpecialChar('*')
        ]],
      address : this.fb.group({
        addressLine1: ['',{validators: [Validators.required]}],
        addressLine2: [''],
        city: ['',{validators: [Validators.required]}],
        state: ['',{validators: [Validators.required]}],
        country: ['',{validators: [Validators.required]}],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, {validators: [Validators.requiredTrue]})
    }, {updateOn: 'blur', validators: [ CustomValidatorComponent.ValidateDate ]});

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => { // it will be called for each key press
    //   // console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data)=>{console.log(data)})
    // })

    console.log("ANNA PAVAN")

    // this.bookingForm.valueChanges.pipe(
    //   exhaustMap((data)=> this.bookingService.bookRoom(data))  // mergeMap , switchMap, exhaustMap
    // ).subscribe((data)=>{console.log(data)})
  }

  addGuestControl(){
    return this.fb.group({ guestName: ['',{validators: [Validators.required]}], age: new FormControl('')})
  }

  addBooking(){
    // console.log(this.bookingForm.value);
    console.log(this.bookingForm.getRawValue()); 
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=> { console.log(data)})
    this.bookingForm.reset({
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address : {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }

  addGuest(){
    this.guests.push(
      // this.fb.group({ guestName: [''], age: new FormControl('')})
      this.addGuestControl()
    )
  }

  removeGuest(i:number){
    this.guests.removeAt(i);
  }

  addPassport(){
    console.log();
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport(){
    if(this.bookingForm.get('passport')){
      this.bookingForm.removeControl('passport');
    }
  }

  getBookingData(){  // setValue -> we need to pass value for each and every control , patchValue --> we can skip some of values
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-march-2024'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address : {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }
}

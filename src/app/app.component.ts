import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet,  RouterModule, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from './employee/employee.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { localStorageToken } from './localstorage.token';
import { HttpClientModule } from '@angular/common/http';
import { AppNavComponent } from "./app-nav/app-nav.component";
import { FormsModule } from '@angular/forms';
import { ConfigService } from './services/config.service';
import { filter } from 'rxjs';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    // template:'<h1>Hello World from Inline template</h1>',
    // for multiline backticks
    // template: `<h1>HELLO PAVAN</h1>  
    // <h2>Angular is Awsome</h2>
    // `,
    styleUrl: './app.component.css',
    providers: [
    ],
    imports: [
      CommonModule, 
      RouterOutlet,  
      ContainerComponent, 
      EmployeeComponent, 
      HttpClientModule, 
      RouterModule, 
      AppNavComponent,  
      FormsModule,
    ]
})
export class AppComponent implements OnInit{

  constructor(@Inject(localStorageToken) private localStorage: any,
        private configService: ConfigService,
        private router: Router
    ){
    // console.log('localStorage', this.localStorage.name);
  }


  // ṭwo
  @ViewChild('name', {static: true}) name!: ElementRef;
  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // })

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      // console.log('Navigation Started')
    })

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      // console.log('Navigation Completed')
    })

    // this.name.nativeElement.innerText = "Hii Hello ANNA PAVAN"

    this.localStorage.setItem("name","ANNAPAVANANNA")
  }


  // one
  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;   // we can change anything in RoomsComponent here
  // }



  title = 'hotelinventoryapp'; 

  role = "Admin"
}

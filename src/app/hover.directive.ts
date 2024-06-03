import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective implements OnInit{

  @Input() color: string = '#9da69f';




  constructor(private element: ElementRef, private renderer: Renderer2) {
    
   }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor',this.color)
  }

  @HostListener("mouseenter") onMouseEnter():void {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor','green')
  }

  @HostListener("mouseleave") onMouseLeave():void{
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor','white')
  }


}

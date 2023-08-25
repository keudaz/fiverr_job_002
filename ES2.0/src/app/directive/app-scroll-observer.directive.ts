import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollObserver]'
})
export class AppScrollObserverDirective {

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const typingContainer = document.querySelector('#typing-container');
          if (typingContainer) {
            this.renderer.addClass(typingContainer, 'blackTyping');
          }

          const mainElement = document.querySelector('main');
          if (mainElement) {
            this.renderer.addClass(mainElement, 'blackBg');
          }

          const bordericon = document.querySelector('#my-path');
          if (bordericon) {
            this.renderer.addClass(bordericon, 'my-path-white');
          }
        } else {
          const typingContainer = document.querySelector('#typing-container');
          if (typingContainer) {
            this.renderer.removeClass(typingContainer, 'blackTyping');
          }

          const mainElement = document.querySelector('main');
          if (mainElement) {
            this.renderer.removeClass(mainElement, 'blackBg');
          }

          const bordericon = document.querySelector('#my-path');
          if (bordericon) {
            this.renderer.removeClass(bordericon, 'my-path-white');
          }
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

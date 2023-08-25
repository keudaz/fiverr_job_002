import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditHeaderService } from 'src/app/services/edit-header.service';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private editHeaderSrv:EditHeaderService) {}

  ngOnInit(): void {}

  @ViewChild('left', { static: false }) left: ElementRef | undefined;
  @ViewChild('center', { static: false }) center: ElementRef | undefined;
  @ViewChild('right', { static: false }) right: ElementRef | undefined;

  openColumn(element: HTMLDivElement){
    element.setAttribute('data-open', 'true');
    const bgColor = element.getAttribute('data-color');
    this.editHeaderSrv.setBgColor(bgColor ?? '');
  }

  closeColumn(element: HTMLDivElement, event: Event){
    event.stopPropagation(); // fix on closeColumn()
    element.setAttribute('data-open', 'false');
    this.editHeaderSrv.resetBackground();
  }

  ngOnDestroy(){
    this.editHeaderSrv.resetBackground();
  }

}

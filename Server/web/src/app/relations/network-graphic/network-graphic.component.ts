import { Component, OnInit, Input, ViewEncapsulation, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import 'd3';
import 'nvd3';
import { RelationService } from '../../_service/relation.service';
const color = d3.scale.category20();

@Component({
  selector: 'app-network-graphic',
  templateUrl: './network-graphic.component.html',
  styleUrls: ['../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class NetworkGraphicComponent implements OnInit {
  @Input() networkIdNumber: string;
  @ViewChild('modalContent') modalContent: ElementRef;
  options: any;
  data: any;

  constructor(private relationService: RelationService) {}

  ngOnInit() {  }
  
  ngOnChanges() {

    let width = 0 ;
    let height = 0 ;

    if (nv.utils.windowSize().width > 950) {
      width =  900;
    } else if (nv.utils.windowSize().width > 650 ){
      width = 600;
    } else {
      width = 250;
    }
    if (nv.utils.windowSize().height > 950) {
      height =  900;
    } else if (nv.utils.windowSize().height > 650){
      height = 600;
    } else {
      height = 250;
    }

    this.options = {
      chart: {
        type: 'forceDirectedGraph',
        height: height,
        width: width,
        margin: { top: 0, right: 0 , bottom: 0, left: 0 },
        radius: 10,
        linkDist: 1,
        gravity: 0.1,
        theta: 0.8,
        friction: 0.9,
        alpha: 0.1,
        charge: -1000,
        tooltip: {
          contentGenerator: function(d) {
            let content = '<div><label>名稱：<label>' + d['name'] + '</div>';
            content += '<div><label>ID：<label>' + d['idNumber'] + '</div>';
            content += '<div><label>原因：<label>' + d['reason'] + '</div>';
            content += '<div><label>備註：<label></div>';
            d['memo'].forEach(element => {
              content += '<div>' + element + '</div>';
            });
            content += '<div><label>關係：<label></div>';
            d['relations'].forEach(element => {
              content += '<div>' + element + '</div>';
            });

            return content;
          }
        },
        color: function(d) {
          return color(d.group);
        },
        nodeExtras: function(node) {
          node &&
            node
              .append('text')
              .attr('dx', '1em')
              .attr('dy', '1em')
              .text(function(d) {
                return d.name;
              })
              .style('font-size', '20px');
        }
      }
    };
    console.log('changes');
    if (this.networkIdNumber) {
      this.relationService.getNetwork(this.networkIdNumber).subscribe(r => {
        this.data = r;
      })
    }
  }
}

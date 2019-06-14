import Vue from 'vue';
import * as d3 from 'd3';
import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

type SVG = d3.Selection<any, any, any, any>;

export type CB = (svg: SVG) => void;

interface MessageEvents {
  mounted: CB;
  destroyed: CB;
}

export interface D3Link {
  source: string;
  target: string;
  color?: string;
}

export interface D3Node {
  id: string;
  rx: number;
  height: number;
  width: number;
  stroke: string;
  text?: string;
  index: number;
  vx: number;
  vy: number;
  actionText?: string;
  x: number;
  y: number;
  hullGroup?: number;
  onDidClick?: () => void;
  onDidDblclick?: () => void;
  onDidMousedown?: () => void;
}

export const emitter = new EventEmitter() as TypedEmitter<MessageEvents>;

export interface ID3 extends Vue {
  isD3: true;
  addLink(link: D3Link): void;
  addNode(node: D3Node): void;
}

export const isD3 = (component: any): component is ID3 => {
  return component.isD3 === true;
};

export interface D3Hull {
  group: number;
  nodes: D3Node[];
  path: Array<[number, number]>;
}

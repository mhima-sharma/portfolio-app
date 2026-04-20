import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconName =
  | 'dashboard'
  | 'layers'
  | 'file-text'
  | 'external-link'
  | 'link'
  | 'summary'
  | 'briefcase'
  | 'projects'
  | 'education'
  | 'map-pin'
  | 'mail'
  | 'phone';

type IconShape = {
  type: 'path' | 'circle' | 'line' | 'polyline' | 'rect';
  value?: string;
  cx?: number;
  cy?: number;
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="stroke()"
      stroke-width="1.9"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (shape of shapes(); track $index) {
        @switch (shape.type) {
          @case ('path') {
            <path [attr.d]="shape.value"></path>
          }
          @case ('circle') {
            <circle [attr.cx]="shape.cx" [attr.cy]="shape.cy" [attr.r]="shape.r"></circle>
          }
          @case ('line') {
            <line [attr.x1]="shape.x1" [attr.y1]="shape.y1" [attr.x2]="shape.x2" [attr.y2]="shape.y2"></line>
          }
          @case ('polyline') {
            <polyline [attr.points]="shape.value"></polyline>
          }
          @case ('rect') {
            <rect [attr.x]="shape.x" [attr.y]="shape.y" [attr.width]="shape.width" [attr.height]="shape.height" [attr.rx]="shape.rx"></rect>
          }
        }
      }
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name = input<IconName>('dashboard');
  size = input(18);
  stroke = input('currentColor');

  shapes = computed<IconShape[]>(() => {
    switch (this.name()) {
      case 'dashboard':
        return [
          { type: 'rect', x: 3, y: 3, width: 7, height: 7, rx: 1.5 },
          { type: 'rect', x: 14, y: 3, width: 7, height: 5, rx: 1.5 },
          { type: 'rect', x: 14, y: 12, width: 7, height: 9, rx: 1.5 },
          { type: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1.5 },
        ];
      case 'layers':
        return [
          { type: 'polyline', value: '12 3 21 8 12 13 3 8 12 3' },
          { type: 'polyline', value: '3 12 12 17 21 12' },
          { type: 'polyline', value: '3 16 12 21 21 16' },
        ];
      case 'file-text':
        return [
          { type: 'path', value: 'M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8z' },
          { type: 'polyline', value: '14 2 14 8 20 8' },
          { type: 'line', x1: 16, y1: 13, x2: 8, y2: 13 },
          { type: 'line', x1: 16, y1: 17, x2: 8, y2: 17 },
          { type: 'line', x1: 10, y1: 9, x2: 8, y2: 9 },
        ];
      case 'external-link':
        return [
          { type: 'path', value: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
          { type: 'polyline', value: '15 3 21 3 21 9' },
          { type: 'line', x1: 10, y1: 14, x2: 21, y2: 3 },
        ];
      case 'link':
        return [
          { type: 'path', value: 'M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 1 0-7.07-7.07L11 4' },
          { type: 'path', value: 'M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L13 20' },
        ];
      case 'summary':
        return [
          { type: 'path', value: 'M4 4h16v16H4z' },
          { type: 'line', x1: 8, y1: 9, x2: 16, y2: 9 },
          { type: 'line', x1: 8, y1: 13, x2: 16, y2: 13 },
          { type: 'line', x1: 8, y1: 17, x2: 13, y2: 17 },
        ];
      case 'briefcase':
        return [
          { type: 'rect', x: 3, y: 7, width: 18, height: 13, rx: 2 },
          { type: 'path', value: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2' },
          { type: 'line', x1: 3, y1: 12, x2: 21, y2: 12 },
        ];
      case 'projects':
        return [
          { type: 'rect', x: 3, y: 4, width: 18, height: 14, rx: 2 },
          { type: 'path', value: 'M8 20h8' },
          { type: 'path', value: 'M12 18v2' },
        ];
      case 'education':
        return [
          { type: 'path', value: 'M2 8l10-5 10 5-10 5-10-5z' },
          { type: 'path', value: 'M6 10.5v4.5c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5' },
        ];
      case 'map-pin':
        return [
          { type: 'path', value: 'M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z' },
          { type: 'circle', cx: 12, cy: 10, r: 3 },
        ];
      case 'mail':
        return [
          { type: 'rect', x: 3, y: 5, width: 18, height: 14, rx: 2 },
          { type: 'polyline', value: '3 7 12 13 21 7' },
        ];
      case 'phone':
        return [
          { type: 'path', value: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.46-1.29a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z' },
        ];
    }
  });
}

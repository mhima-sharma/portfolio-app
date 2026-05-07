import { ChangeDetectionStrategy, Component, ElementRef, effect, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-freefolio-iframe',
  standalone: true,
  template: `
    <iframe
      #frame
      class="block w-full border-0 bg-transparent"
      [attr.title]="title()"
      (load)="resize()"
    ></iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreefolioIframeComponent {
  html = input.required<string>();
  title = input('Freefolio theme');

  private frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');

  constructor() {
    effect(() => {
      this.frame();
      const html = this.html();
      this.writeDocument(html);
    });
  }

  private writeDocument(html: string) {
    const iframe = this.frame()?.nativeElement;
    const doc = iframe?.contentDocument;

    if (!iframe || !doc) {
      return;
    }

    doc.open();
    doc.write(html);
    doc.close();

    this.resize();
  }

  protected resize() {
    const iframe = this.frame()?.nativeElement;
    if (!iframe) {
      return;
    }

    const resizeOnce = () => {
      const doc = iframe.contentDocument;
      if (!doc) {
        return;
      }

      const height = Math.max(
        doc.body?.scrollHeight ?? 0,
        doc.documentElement?.scrollHeight ?? 0,
        doc.body?.offsetHeight ?? 0,
        doc.documentElement?.offsetHeight ?? 0
      );

      iframe.style.height = `${Math.max(height, 720)}px`;
    };

    resizeOnce();
    window.setTimeout(resizeOnce, 100);
    window.setTimeout(resizeOnce, 350);
    window.setTimeout(resizeOnce, 800);
  }
}

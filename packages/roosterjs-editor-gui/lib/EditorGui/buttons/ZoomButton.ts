import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui/lib';
import { FormatState } from 'roosterjs/lib';

const sizes = [50, 90, 100, 110, 120, 130, 140, 150, 200];

export default class ZoomButton implements EditorToolbarButton {
    private editor: Editor;
    private span: HTMLElement;
    private spanLabel: HTMLElement;
    private wrapper: HTMLElement;

    private optionsSpans: Map<number, HTMLElement> = new Map();

    constructor(editor: EditorWithGui) {
        this.wrapper = editor.getEditorDiv();
        this.editor = editor.getEditor();
        this.span = this.generateElement();
    }

    getName(): string {
        return 'zoom';
    }

    getIcon(): string {
        return icons.zoom;
    }

    doAction(size: string) {
        let zoom = parseFloat(size) / 100;
        this.wrapper.style.zoom = zoom + '';

        let s = parseInt(size);

        this.optionsSpans.forEach((v, key) => {
            if (key != s) {
                v.classList.remove('selected');
            } else {
                v.classList.add('selected');
                this.spanLabel.innerHTML = size + '%';
            }
        });
    }

    updateState(state: FormatState) {
        //nothing
    }

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'btn dropdown';
        span.innerHTML = this.getIcon();

        this.spanLabel = <HTMLSpanElement>document.createElement('span');
        this.spanLabel.innerHTML = '100%';

        span.appendChild(this.spanLabel);

        document.addEventListener('click', (e: MouseEvent) => {
            var ec = e.target as HTMLElement;

            if (this.span.classList.contains('opened') && !this.span.contains(ec)) {
                this.span.classList.remove('opened');
            }
        });

        span.addEventListener('click', (_e: MouseEvent) => {
            this.editor.focus();

            if (this.span.classList.contains('opened')) {
                this.span.classList.remove('opened');
            } else {
                this.span.classList.add('opened');
            }
        });

        let optionsDiv = <HTMLDivElement>document.createElement('div');
        optionsDiv.className = 'options';

        sizes.forEach(a => {
            var o = <HTMLSpanElement>document.createElement('span');
            o.className = 'option';
            o.setAttribute('data-size', a + '');
            o.innerHTML = a + '%';
            optionsDiv.appendChild(o);

            this.optionsSpans.set(a, o);
        });

        optionsDiv.addEventListener('click', (e: MouseEvent) => {
            let target = e.target;

            if (target && target instanceof HTMLElement) {
                let tw = target as HTMLElement;
                this.doAction(tw.dataset.size);

                console.log(tw);
            }

            console.log(e);
        });

        span.appendChild(optionsDiv);
        return span;
    }
}

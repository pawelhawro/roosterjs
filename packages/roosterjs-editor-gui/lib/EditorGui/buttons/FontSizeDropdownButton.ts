import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';
import { getFormatState, setFontSize } from 'roosterjs-editor-api';

const sizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 36];

export default class FontSizeDropdownButton implements EditorToolbarButton {
    private editor: Editor;
    private span: HTMLElement;

    private optionsSpans: Map<number, HTMLElement> = new Map();

    constructor(editor: Editor) {
        this.editor = editor;
        this.span = this.generateElement();
    }

    getName(): string {
        return 'fontsize';
    }

    getIcon(): string {
        return icons.fontSize;
    }

    doAction(size: string) {
        //toggleUnderline(this.editor);

        setFontSize(this.editor, size + 'pt');
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        let size = parseInt(state.fontSize);

        if (this.optionsSpans.has(size)) {
            if (this.optionsSpans.get(size).classList.contains('selected')) {
                return;
            }
        }

        this.optionsSpans.forEach((v, key) => {
            if (key != size) {
                v.classList.remove('selected');
            } else {
                v.classList.add('selected');
            }
        });
    }

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'btn dropdown';
        span.innerHTML = this.getIcon();
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
            o.innerHTML = a + '';
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

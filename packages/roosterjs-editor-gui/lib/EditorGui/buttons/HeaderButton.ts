import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';
import { getFormatState, toggleHeader } from 'roosterjs-editor-api';

interface HeaderStyle {
    level: number;
    name: string;
    style: (node: HTMLElement) => void;
}

const sizes: { [key: string]: HeaderStyle } = {
    empty: {
        level: 0,
        name: 'Tekst',
        style: (node: HTMLElement) => {
            node.classList.add('text');
        },
    },
    h1: {
        level: 1,
        name: 'Naglowek 1',
        style: (node: HTMLElement) => {
            node.classList.add('h1');
        },
    },
    h2: {
        level: 2,
        name: 'Naglowek 2',
        style: (node: HTMLElement) => {
            node.classList.add('h2');
        },
    },
};

export default class HeaderButton implements EditorToolbarButton {
    private editor: Editor;
    private span: HTMLElement;
    private spanLabel: HTMLElement;

    private optionsSpans: Map<number, HTMLElement> = new Map();

    constructor(editor: Editor) {
        this.editor = editor;
        this.span = this.generateElement();
    }

    getName(): string {
        return 'fontsize';
    }

    getIcon(): string {
        return icons.header;
    }

    doAction(size: string) {
        toggleHeader(this.editor, parseInt(size));
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        let size = state.headerLevel;

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

        Object.keys(sizes).forEach(key => {
            let element = sizes[key];

            if (element.level == size) {
                this.spanLabel.innerHTML = sizes[key].name;
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

        this.spanLabel = <HTMLSpanElement>document.createElement('span');
        this.spanLabel.innerHTML = sizes.empty.name;

        span.appendChild(this.spanLabel);

        document.addEventListener('click', (e: MouseEvent) => {
            var ec = e.target as HTMLElement;

            if (this.span.classList.contains('opened') && !this.span.contains(ec)) {
                this.span.classList.remove('opened');
            }
        });

        span.addEventListener('click', (e: MouseEvent) => {
            this.editor.focus();

            if (this.span.classList.contains('opened')) {
                this.span.classList.remove('opened');
            } else {
                this.span.classList.add('opened');
            }
        });

        let optionsDiv = <HTMLDivElement>document.createElement('div');
        optionsDiv.className = 'options';

        Object.keys(sizes).forEach(key => {
            let element = sizes[key];
            var o = <HTMLSpanElement>document.createElement('span');
            o.className = 'option';
            o.setAttribute('data-size', element.level + '');
            o.innerHTML = element.name;
            element.style(o);

            optionsDiv.appendChild(o);

            this.optionsSpans.set(element.level, o);
        });

        optionsDiv.addEventListener('click', (e: MouseEvent) => {
            let target = e.target;

            if (target && target instanceof HTMLElement) {
                let tw = target as HTMLElement;
                this.doAction(tw.dataset.size);
            }
        });

        span.appendChild(optionsDiv);
        return span;
    }
}

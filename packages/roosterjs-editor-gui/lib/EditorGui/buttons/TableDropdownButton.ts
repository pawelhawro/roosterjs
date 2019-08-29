import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs-editor-types';
import { insertTable } from 'roosterjs-editor-api';

interface TableCellHelper {
    x: number;
    y: number;
    node: HTMLElement;
}

export default class TableDropdownButton implements EditorToolbarButton {
    private editor: Editor;
    private span: HTMLElement;

    private cells: TableCellHelper[];

    constructor(editor: Editor) {
        this.editor = editor;
        this.span = this.generateElement();
    }

    getName(): string {
        return 'fontsize';
    }

    getIcon(): string {
        return icons.table;
    }

    doAction(cols: number, rows: number) {
        if (cols > 0 && cols <= 10 && rows > 0 && rows <= 10) {
            insertTable(this.editor, cols, rows);
        }
    }

    updateState(state: FormatState) {
        //initially empty
    }

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'btn dropdown';
        span.innerHTML = this.getIcon();

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
        optionsDiv.className = 'options table-insert';

        this.cells = [];

        for (var i = 0; i < 10; i++) {
            var row = <HTMLSpanElement>document.createElement('div');

            for (var j = 0; j < 10; j++) {
                var o = <HTMLSpanElement>document.createElement('span');
                o.className = 'table-cell-square';
                o.setAttribute('data-row', i + '');
                o.setAttribute('data-col', j + '');
                o.innerHTML = '&nbsp;';
                row.appendChild(o);

                this.cells.push({
                    x: j,
                    y: i,
                    node: o,
                });
            }

            optionsDiv.appendChild(row);
        }

        optionsDiv.addEventListener('mousemove', e => {
            let c = Math.ceil(e.offsetX / 20);
            let r = Math.ceil(e.offsetY / 20);

            this.cells.forEach(z => {
                if (z.x < c && z.y < r) {
                    z.node.classList.add('active');
                } else {
                    z.node.classList.remove('active');
                }
            });

            console.log(e, e.offsetX, e.offsetY, c, r);
        });

        optionsDiv.addEventListener('click', e => {
            let c = Math.ceil(e.offsetX / 20);
            let r = Math.ceil(e.offsetY / 20);

            this.doAction(c, r);
            console.log(e, e.offsetX, e.offsetY, c, r);
        });

        span.appendChild(optionsDiv);
        return span;
    }
}

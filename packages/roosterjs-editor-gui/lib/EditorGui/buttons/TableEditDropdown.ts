import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { ChangeSource, FormatState } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';
import { insertTable } from 'roosterjs-editor-api';

export default class TableEditDropdown implements EditorToolbarButton {
    private editor: Editor;
    private span: HTMLElement;

    constructor(editor: Editor) {
        this.editor = editor;
        this.span = this.generateElement();
    }

    getName(): string {
        return 'table';
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
        console.log('current state table: ', state.isTable);
        //initially empty

        if (state.isTable) {
            this.span.classList.remove('disabled');
        } else {
            if (!this.span.classList.contains('disabled')) {
                this.span.classList.add('disabled');
            }
        }
    }

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    public addRow(below: boolean) {
        let currentRow = this.editor.getElementAtCursor('TR');
        let currentTable = this.editor.getElementAtCursor('TABLE');
        console.log(currentRow);

        var clonedRow = currentRow.cloneNode(true);
        clonedRow.childNodes.forEach(n => {
            if (n instanceof HTMLElement) {
                let td = <HTMLElement>n;
                if (td.tagName == 'TD') {
                    td.innerHTML = '';
                }
            }
        });

        if (below) {
            this.editor.addUndoSnapshot(() => {
                currentTable.insertBefore(clonedRow, currentRow.nextSibling);
            }, ChangeSource.Format);
        } else {
            this.editor.addUndoSnapshot(() => {
                currentTable.insertBefore(clonedRow, currentRow);
            }, ChangeSource.Format);
        }
    }

    public addRowAbove() {
        let currentRow = this.editor.getElementAtCursor('TR');
        let currentTable = this.editor.getElementAtCursor('TABLE');
        console.log(currentRow);

        var clonedRow = currentRow.cloneNode(true);
        clonedRow.childNodes.forEach(n => {
            if (n instanceof HTMLElement) {
                let td = <HTMLElement>n;
                if (td.tagName == 'TD') {
                    td.innerHTML = '';
                }
            }
        });

        this.editor.addUndoSnapshot(() => {
            currentTable.insertBefore(clonedRow, currentRow.nextSibling);
        }, ChangeSource.Format);
    }

    public spanWithRight() {
        let currentRow = this.editor.getElementAtCursor('TR');
        //let currentTable = this.editor.getElementAtCursor('TABLE');
        let currentCell = this.editor.getElementAtCursor('TD');

        let cells = currentRow.children;

        let index = 0;
        for (var i = 0; i < cells.length; i++) {
            if (currentCell == cells.item(i)) {
                index = i;
                break;
            }
        }

        console.log('Size' + cells.length + '  index = ' + index);


        let colspanAttr = currentCell.attributes.getNamedItem('colspan');


        var colspan = parseInt(.value);
        console.log(colspan);
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

            if (this.span.classList.contains('disabled')) {
                return;
            }

            if (this.span.classList.contains('opened')) {
                this.span.classList.remove('opened');
            } else {
                this.span.classList.add('opened');
            }
        });

        let optionsDiv = <HTMLDivElement>document.createElement('div');
        optionsDiv.className = 'options';

        var o = <HTMLSpanElement>document.createElement('span');
        o.className = 'option';
        o.innerText = 'Dodaj wiersz poniżej';
        optionsDiv.appendChild(o);

        o.addEventListener('click', (e: MouseEvent) => {
            this.editor.focus();
            this.addRow(true);
        });

        var o2 = <HTMLSpanElement>document.createElement('span');
        o2.className = 'option';
        o2.innerText = 'Dodaj wiersz powyżej';
        optionsDiv.appendChild(o2);

        o2.addEventListener('click', (e: MouseEvent) => {
            this.editor.focus();
            this.addRow(false);
        });

        var o3 = <HTMLSpanElement>document.createElement('span');
        o3.className = 'option';
        o3.innerText = 'Złącz po prawej';
        optionsDiv.appendChild(o3);

        o3.addEventListener('click', (e: MouseEvent) => {
            this.editor.focus();
            this.spanWithRight();
        });

        span.appendChild(optionsDiv);
        return span;
    }
}

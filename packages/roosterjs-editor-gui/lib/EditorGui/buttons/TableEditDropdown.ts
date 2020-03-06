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
        return 'tableEdit';
    }

    getIcon(): string {
        return icons.tableEdit;
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

        console.log('Size  ' + cells.length + '  index = ' + index);

        var colspan = this.colspan(currentCell);

        var canSpanRight = false;

        console.log('ch', index, cells.length - 1);

        if (index < cells.length - 1) {
            console.log('lower???');
            canSpanRight = true;
        }

        console.log('can span', canSpanRight);

        if (canSpanRight) {
            console.log('Setting span');
            this.editor.addUndoSnapshot(() => {
                var next = <HTMLElement>cells.item(index + 1);
                var nextcolspan = this.colspan(next);
                currentRow.removeChild(next);
                currentCell.setAttribute('colspan', colspan + nextcolspan + '');
            }, ChangeSource.Format);
        }

        console.log(colspan);
    }

    private colspan(e: HTMLElement): number {
        let colspanAttr = e.attributes.getNamedItem('colspan');

        var colspan = 1;
        if (null != colspanAttr) {
            colspan = parseInt(colspanAttr.value);
        }
        return colspan;
    }

    public despan() {
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

        console.log('Size  ' + cells.length + '  index = ' + index);

        var colspan = this.colspan(currentCell);

        if (colspan == 1) {
            return;
        }

        var clones: Array<HTMLElement> = [];
        for (var i = 1; i < colspan; i++) {
            var clone = <HTMLElement>currentCell.cloneNode(true);
            clone.innerHTML = '';
            clone.removeAttribute('colspan');
            clones.push(clone);
        }

        console.log('Setting despan');
        this.editor.addUndoSnapshot(() => {
            currentCell.removeAttribute('colspan');
            clones.forEach(e => {
                currentRow.insertBefore(e, currentCell.nextSibling);
            });
        }, ChangeSource.Format);
    }

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'btn dropdown disabled';
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

        var o4 = <HTMLSpanElement>document.createElement('span');
        o4.className = 'option';
        o4.innerText = 'Podziel';
        optionsDiv.appendChild(o4);

        o4.addEventListener('click', (e: MouseEvent) => {
            this.editor.focus();
            this.despan();
        });

        span.appendChild(optionsDiv);
        return span;
    }
}

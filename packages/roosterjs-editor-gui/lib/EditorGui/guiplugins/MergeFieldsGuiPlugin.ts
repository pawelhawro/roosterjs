import AbstractButton from '../buttons/AbstractButton';
import EditorGuiPlugin from '../interfaces/EditorGuiPlugin';
import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { ChangeSource, FormatState } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui/lib';

/**
 * Insert tab sign on tab press outside li
 */
export default class MergeFieldsGuiPlugin implements EditorGuiPlugin {
    editor: EditorWithGui;
    button: MergeFieldButton;
    fields: string[];

    dialog: HTMLDivElement;
    cssClass: string;

    constructor(fields: string[], cssClass?: string) {
        this.fields = fields;
        this.cssClass = cssClass;
    }

    getName() {
        return 'MergeFields';
    }

    initialize(editor: EditorWithGui) {
        this.editor = editor;
        this.button = new MergeFieldButton(this.editor.getEditor(), () => {
            this.dialog.style.display = 'block';
        });

        this.dialog = document.createElement('div');
        this.dialog.className = 'dialog';
        this.dialog.style.display = 'none';

        this.fields.forEach(a => {
            let opt = document.createElement('span');
            opt.className = 'option';
            opt.dataset.val = a;
            opt.innerText = a;
            this.dialog.appendChild(opt);
        });

        this.editor.getContentDiv().appendChild(this.dialog);

        this.dialog.addEventListener('click', e => {
            this.dialogClick(e);
        });
    }

    dispose() {
        this.editor = null;
    }

    dialogClick(e: MouseEvent) {
        let target = e.target;

        if (target && target instanceof HTMLElement) {
            let n = target as HTMLElement;

            this.insertField(n.dataset.val);
        }

        console.log(target);
    }

    insertField(text: string) {
        let editor = this.editor.getEditor();

        if (!editor.isDisposed()) {
            editor.focus();
            editor.addUndoSnapshot(() => {
                const span = document.createElement('a');
                span.setAttribute('href', 'javascript:void(0);');
                span.innerHTML = text;

                if (!this.cssClass) {
                    span.style.backgroundColor = 'rgba(131, 208, 242, 0.4)';
                    span.style.border = '1px solid rgb(131, 208, 242)';
                } else {
                    span.className = this.cssClass;
                }

                editor.insertNode(span);
            }, ChangeSource.Format);
        }
    }

    getEditor() {
        return this.editor;
    }

    getButton(): EditorToolbarButton {
        return this.button;
    }
}

class MergeFieldButton extends AbstractButton {
    action: () => void;
    constructor(editor: Editor, action: () => void) {
        super(editor);
        this.action = action;
    }

    getName(): string {
        return 'addmergefield';
    }

    getIcon(): string {
        return icons.mergeField;
    }

    doAction() {
        this.action();
    }

    updateState(state: FormatState) {}
}

import AbstractButton from '../buttons/AbstractButton';
import createSidebar from '../utils/createSidebar';
import DOM from '../utils/DOM';
import EditorGuiPlugin from '../interfaces/EditorGuiPlugin';
import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { ChangeSource, FormatState } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui';

class MergeFieldGroup {
    name: string;

    offs: number;

    fields: string[] = [];

    groups: MergeFieldGroup[] = [];

    constructor(name: string, offs: number) {
        this.name = name;
        this.offs = offs;
    }

    print(e: HTMLElement) {
        var ul = document.createElement('ul');

        this.fields.forEach((e, i) => {
            let li = document.createElement('li');

            let opt = document.createElement('span');
            opt.className = 'option';
            opt.dataset.val = e;
            opt.innerText = e;

            li.appendChild(opt);
            ul.appendChild(li);
        });

        this.groups.forEach((g, i) => {
            let li = document.createElement('li');

            let opt = document.createElement('div');
            opt.className = 'grname';
            opt.innerText = g.name;
            li.appendChild(opt);

            g.print(li);

            ul.appendChild(li);
        });
        e.appendChild(ul);
    }

    addItem(val: string): boolean {
        var parts = val.split('.');

        if (this.name == '' && parts.length == 1) {
            this.fields.push(val);
            return true;
        }

        if (this.offs == -1 || this.name == parts[this.offs]) {
            if (this.offs + 2 == parts.length) {
                this.fields.push(val);
                return true;
            } else {
                for (var i = 0; i < this.groups.length; i++) {
                    if (this.groups[i].addItem(val)) {
                        return true;
                    }
                }

                var sg = new MergeFieldGroup(parts[this.offs + 1], this.offs + 1);
                sg.addItem(val);
                this.groups.push(sg);
                return true;
            }
        }

        return false;
    }
}

/**
 * Insert tab sign on tab press outside li
 */
export default class MergeFieldsGuiPlugin implements EditorGuiPlugin {
    editor: EditorWithGui;
    button: MergeFieldButton;
    fields: string[];

    dialog: HTMLDivElement;
    sidebar: HTMLDivElement;
    cssClass: string;

    groups: MergeFieldGroup;

    constructor(fields: string[], cssClass?: string) {
        this.fields = fields;
        this.cssClass = cssClass;

        this.groups = new MergeFieldGroup('', -1);

        fields.forEach((a, i) => {
            this.groups.addItem(a);
        });
    }

    getName() {
        return 'MergeFields';
    }

    initialize(editor: EditorWithGui) {
        this.editor = editor;
        this.button = new MergeFieldButton(this.editor.getEditor(), () => {
            if (this.sidebar.classList.contains('hidden')) {
                this.sidebar.classList.remove('hidden');
                this.button.setChecked();
            } else {
                this.sidebar.classList.add('hidden');
                this.button.setUnChecked();
            }

            this.editor.getEditor().focus();
        });

        this.dialog = DOM.div('options');

        this.groups.print(this.dialog);

        this.sidebar = createSidebar(editor, 'Wstaw pole', this.dialog);

        this.editor.getWorkspace().appendChild(this.sidebar);

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

            if (n.classList.contains('option')) {
                this.insertField(n.dataset.val);
            }

            if (n.classList.contains('grname')) {
                if (n.parentElement.classList.contains('active')) {
                    n.parentElement.classList.remove('active');
                } else {
                    n.parentElement.classList.add('active');
                }
            }
        }
    }

    insertField(text: string) {
        let editor = this.editor.getEditor();

        if (!editor.isDisposed()) {
            editor.focus();
            editor.addUndoSnapshot(() => {
                const span = document.createElement('a');
                span.setAttribute('href', 'javascript:void(0);');
                span.setAttribute('data-mergefield', 'merge');
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

    setChecked() {
        this.span.classList.add('checked');
    }

    setUnChecked() {
        this.span.classList.remove('checked');
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

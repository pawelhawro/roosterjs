import AbstractButton from '../buttons/AbstractButton';
import EditorGuiPlugin from '../interfaces/EditorGuiPlugin';
import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { ChangeSource, ContentPosition, FormatState } from 'roosterjs/lib';
import { Editor } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui/lib';

/**
 * Insert tab sign on tab press outside li
 */
export default class PageBreakGuiPlugin implements EditorGuiPlugin {
    editor: EditorWithGui;
    button: PageBreakButton;

    cssClass?: string;

    constructor(cssClass?: string) {
        this.cssClass = cssClass;
    }

    getName() {
        return 'PageBreak';
    }

    /**
     * add click event listener
     * to remove pagebreak on click
     */
    private attachClickListener() {
        this.editor.getEditorDiv().addEventListener('click', e => {
            let editor = this.editor.getEditor();

            if (!editor.isDisposed()) {
                if (e.target && e.target instanceof HTMLDivElement) {
                    let div = e.target as HTMLDivElement;
                    if (div.classList.contains('page-break')) {
                        editor.addUndoSnapshot(() => {
                            div.parentElement.removeChild(div);
                        });
                    }
                }
            }
        });
    }

    initialize(editor: EditorWithGui) {
        this.editor = editor;

        this.attachClickListener();

        this.button = new PageBreakButton(this.editor.getEditor(), () => {
            let editor = this.editor.getEditor();

            if (!editor.isDisposed()) {
                editor.focus();
                editor.addUndoSnapshot(() => {
                    let nextdiv = editor.getDocument().createElement('DIV');
                    nextdiv.innerHTML = '<br>';

                    editor.insertNode(nextdiv, {
                        insertOnNewLine: true,
                        position: ContentPosition.SelectionStart,
                    });

                    let div = editor.getDocument().createElement('DIV');
                    div.className = 'page-break';

                    if (!this.cssClass) {
                        div.style.padding = '5px 0';
                        div.style.margin = '10px 0';
                        div.style.color = '#666';
                        div.style.backgroundColor = '#eaeaea';
                        div.style.fontSize = '11px';
                        div.style.fontFamily = 'sans-serif';
                        div.style.width = '100%';
                        div.style.textAlign = 'center';
                    } else {
                        div.classList.add(this.cssClass);
                    }

                    div.innerHTML =
                        '‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧ Page Break ‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧';
                    div.setAttribute('contenteditable', 'false');

                    editor.insertNode(div, {
                        insertOnNewLine: true,
                        position: ContentPosition.SelectionStart,
                    });
                }, ChangeSource.Format);
            }
        });
    }

    dispose() {
        this.editor = null;
    }

    getEditor() {
        return this.editor;
    }

    getButton(): EditorToolbarButton {
        return this.button;
    }
}

class PageBreakButton extends AbstractButton {
    action: () => void;
    constructor(editor: Editor, action: () => void) {
        super(editor);
        this.action = action;
    }

    getName(): string {
        return 'addmergefield';
    }

    getIcon(): string {
        return icons.pageBreak;
    }

    doAction() {
        this.action();
    }

    updateState(state: FormatState) {}
}

import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';

export default class UndoButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'undo';
    }

    getIcon(): string {
        return icons.undo;
    }

    doAction() {
        this.editor.undo();
    }

    updateState(state: FormatState) {
        if (!state.canUndo) {
            this.span.classList.add('disabled');
        } else {
            this.span.classList.remove('disabled');
        }
    }
}

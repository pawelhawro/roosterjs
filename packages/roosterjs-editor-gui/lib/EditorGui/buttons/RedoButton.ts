import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';

export default class RedoButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'redo';
    }

    getIcon(): string {
        return icons.redo;
    }

    doAction() {
        this.editor.redo();
        //this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (!state.canRedo) {
            this.span.classList.add('disabled');
        } else {
            this.span.classList.remove('disabled');
        }
    }
}

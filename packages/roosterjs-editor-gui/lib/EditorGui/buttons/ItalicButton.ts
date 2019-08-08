import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';
import { getFormatState, toggleItalic } from 'roosterjs-editor-api';

export default class ItalicButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'italic';
    }

    getIcon(): string {
        return icons.italic;
    }

    doAction() {
        toggleItalic(this.editor);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.isItalic) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

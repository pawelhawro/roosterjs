import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs-editor-types';
import { getFormatState, toggleSuperscript } from 'roosterjs-editor-api';

export default class SuperscriptButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'sup';
    }

    getIcon(): string {
        return icons.superscript;
    }

    doAction() {
        toggleSuperscript(this.editor);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.isSuperscript) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

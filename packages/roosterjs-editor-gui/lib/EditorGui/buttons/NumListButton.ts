import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';
import { getFormatState, toggleNumbering } from 'roosterjs-editor-api';

export default class NumListButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'numlist';
    }

    getIcon(): string {
        return icons.numList;
    }

    doAction() {
        toggleNumbering(this.editor);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.isNumbering) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

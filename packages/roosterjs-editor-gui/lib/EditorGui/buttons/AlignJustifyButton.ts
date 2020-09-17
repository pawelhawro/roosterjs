import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs-editor-types';
import { getFormatState, setJustifyFull } from 'roosterjs-editor-api';

export default class AlignJustifyButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'aligncenter';
    }

    getIcon(): string {
        return icons.textJustify;
    }

    doAction() {
        setJustifyFull(this.editor);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.alignJustify) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

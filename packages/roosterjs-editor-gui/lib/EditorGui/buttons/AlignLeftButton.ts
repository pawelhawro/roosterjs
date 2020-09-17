import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Alignment, FormatState } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';
import { getFormatState, setAlignment } from 'roosterjs-editor-api';

export default class AlignLeftButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'alignleft';
    }

    getIcon(): string {
        return icons.textLeft;
    }

    doAction() {
        setAlignment(this.editor, Alignment.Left);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.alignLeft) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Alignment, FormatState } from 'roosterjs/lib';
import { Editor } from 'roosterjs-editor-core';
import { getFormatState, setAlignment } from 'roosterjs-editor-api';

export default class AlignCenterButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'aligncenter';
    }

    getIcon(): string {
        return icons.textCenter;
    }

    doAction() {
        setAlignment(this.editor, Alignment.Center);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.alignCenter) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

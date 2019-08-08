import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState, Indentation } from 'roosterjs/lib';
import { setIndentation } from 'roosterjs-editor-api';

export default class DecreaseIndentButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'decreaseindent';
    }

    getIcon(): string {
        return icons.decIndent;
    }

    doAction() {
        setIndentation(this.editor, Indentation.Decrease);
    }

    updateState(state: FormatState) {}
}

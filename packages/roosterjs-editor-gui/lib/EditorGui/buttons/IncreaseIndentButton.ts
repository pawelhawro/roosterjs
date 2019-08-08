import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState, Indentation } from 'roosterjs/lib';
import { setIndentation } from 'roosterjs-editor-api';

export default class IncreaseIndentButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'increaseindent';
    }

    getIcon(): string {
        return icons.incIndent;
    }

    doAction() {
        setIndentation(this.editor, Indentation.Increase);
    }

    updateState(state: FormatState) {}
}

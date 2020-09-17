import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { clearBlockFormat, clearFormat } from 'roosterjs-editor-api';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs-editor-types';

export default class ClearStyleButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'clearstyle';
    }

    getIcon(): string {
        return icons.clearStyle;
    }

    doAction() {
        clearFormat(this.editor);

        let selection = this.editor.getSelection();

        if (selection != null) {
            if (selection.isCollapsed) {
                clearBlockFormat(this.editor);
            }
        }
    }

    updateState(state: FormatState) {}
}

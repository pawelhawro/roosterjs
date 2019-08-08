import AbstractButton from './AbstractButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';
import { getFormatState, toggleBullet } from 'roosterjs-editor-api';

export default class BulletListButton extends AbstractButton {
    constructor(editor: Editor) {
        super(editor);
    }

    getName(): string {
        return 'bulletlist';
    }

    getIcon(): string {
        return icons.bulletList;
    }

    doAction() {
        toggleBullet(this.editor);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.isBullet) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }
}

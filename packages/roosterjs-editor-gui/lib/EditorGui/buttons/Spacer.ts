import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs-editor-types';

/**
 * Interface of an editor plugin
 */
export default class Spacer implements EditorToolbarButton {
    private span: HTMLElement;

    constructor(editor: Editor) {
        this.span = this.generateElement();
    }

    getName(): string {
        return 'spacer';
    }

    getIcon(): string {
        return '';
    }

    doAction() {
        //empty
    }

    updateState(state: FormatState) {
        //empty
    }

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'spacer';
        span.innerHTML = '';
        return span;
    }
}

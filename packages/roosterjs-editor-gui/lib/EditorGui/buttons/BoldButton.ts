import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import icons from '../icons/icons';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';
import { getFormatState } from 'roosterjs-editor-api';
import { toggleBold } from 'roosterjs-editor-api';
/**
 * Interface of an editor plugin
 */
export default class BoldButton implements EditorToolbarButton {
    private editor: Editor;
    private span: HTMLElement;

    constructor(editor: Editor) {
        this.editor = editor;
        this.span = this.generateElement();
        console.log(this.editor);
    }

    getName(): string {
        return 'bold';
    }

    getIcon(): string {
        return icons.bold;
    }

    doAction() {
        console.log(this, this.editor);
        toggleBold(this.editor);
        this.updateState(getFormatState(this.editor));
    }

    updateState(state: FormatState) {
        if (state.isBold) {
            this.span.classList.add('checked');
        } else {
            this.span.classList.remove('checked');
        }
    }

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    /**
     * Get a friendly name of this plugin
     */
    getCssClassName: () => string;

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'btn';
        span.innerHTML = this.getIcon();
        span.addEventListener('click', (_e: MouseEvent) => {
            this.doAction();
        });
        return span;
    }
}

import EditorToolbarButton from '../interfaces/EditorToolbarButton';
import { Editor } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs/lib';

/**
 * Interface of an editor plugin
 */
export default abstract class AbstractButton implements EditorToolbarButton {
    protected editor: Editor;
    protected span: HTMLElement;

    constructor(editor: Editor) {
        this.editor = editor;
        this.span = this.generateElement();
    }

    abstract getName(): string;

    abstract getIcon(): string;

    abstract doAction(): void;

    abstract updateState(state: FormatState): void;

    public append(div: HTMLDivElement) {
        div.appendChild(this.span);
    }

    public generateElement(): HTMLSpanElement {
        let span = <HTMLSpanElement>document.createElement('span');
        span.className = 'btn';
        span.innerHTML = this.getIcon();
        span.addEventListener('click', (e: MouseEvent) => {
            this.doAction();
        });
        return span;
    }
}

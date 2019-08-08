import { FormatState } from 'roosterjs-editor-types';

/**
 * Interface of an editor plugin
 */
export default interface EditorToolbarButton {
    getName: () => string;
    updateState: (state: FormatState) => void;
    append: (div: HTMLDivElement) => void;
}

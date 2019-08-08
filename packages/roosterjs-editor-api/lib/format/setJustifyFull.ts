import execCommand from '../utils/execCommand';
import { ChangeSource, DocumentCommand, QueryScope } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';

/**
 * Set content alignment
 * @param editor The editor instance
 */
export default function setJustifyFull(editor: Editor) {
    let command = DocumentCommand.JustifyFull;
    let align = 'justify';

    editor.addUndoSnapshot(() => {
        execCommand(editor, command);
        editor.queryElements(
            '[align]',
            QueryScope.OnSelection,
            node => (node.style.textAlign = align)
        );
    }, ChangeSource.Format);
}

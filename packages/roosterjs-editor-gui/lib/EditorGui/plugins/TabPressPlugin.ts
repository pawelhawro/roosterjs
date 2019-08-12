import { cacheGetElementAtCursor, Editor, EditorPlugin, Keys } from 'roosterjs-editor-core';
import { PluginEvent, PluginEventType } from 'roosterjs-editor-types';

/**
 * Insert tab sign on tab press outside li
 */
export default class TabPressPlugin implements EditorPlugin {
    editor: Editor;

    getName() {
        return 'TabPressPlugin';
    }

    initialize(editor: Editor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    getEditor() {
        return this.editor;
    }

    isInListElement(event: PluginEvent) {
        let li = cacheGetElementAtCursor(this.editor, event, 'LI,TABLE');
        return null != li;
    }

    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.KeyDown) {
            //tab press
            if (event.rawEvent.keyCode == Keys.TAB && !this.isInListElement(event)) {
                event.rawEvent.preventDefault();
                if (!event.rawEvent.shiftKey) {
                    let span = document.createElement('SPAN');
                    span.appendChild(document.createTextNode('\t'));
                    span.style.whiteSpace = 'pre';
                    this.editor.insertNode(span);
                }
            }
        }
    }
}

import { Editor, EditorPlugin } from 'roosterjs-editor-core';
import { PluginEvent, PluginEventType } from 'roosterjs-editor-types';

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

    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.KeyDown) {
            let code = event.rawEvent.keyCode;

            //tab press
            if (code == 9) {
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

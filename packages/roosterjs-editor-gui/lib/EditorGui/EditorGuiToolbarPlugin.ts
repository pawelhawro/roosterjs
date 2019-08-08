import EditorWithGui from './EditorWithGui';
import { Editor, EditorPlugin } from 'roosterjs-editor-core';
import { getFormatState } from 'roosterjs-editor-api';
import { PluginEvent, PluginEventType } from 'roosterjs-editor-types';

export default class EditorGuiToolbarPlugin implements EditorPlugin {
    editor: Editor;
    gui: EditorWithGui;

    getName() {
        return 'EditorGuiToolbar';
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

    setEditorGui(gui: EditorWithGui) {
        this.gui = gui;
    }

    onPluginEvent(event: PluginEvent) {
        if (
            this.gui &&
            this.editor &&
            (event.eventType == PluginEventType.KeyUp ||
                event.eventType == PluginEventType.MouseUp ||
                event.eventType == PluginEventType.ContentChanged)
        ) {
            let state = getFormatState(this.editor, event);
            this.gui.updateState(state);
        }
    }
}

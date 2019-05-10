import Editor from '../editor/Editor';
import { PluginEvent } from 'roosterjs-editor-types';

/**
 * Interface of an editor plugin
 */
export default interface EditorPlugin {
    /**
     * Get a friendly name of this plugin
     */
    getName: () => string;

    /**
     * The first method that editor will call to a plugin when editor is initializing.
     * It will pass in the editor instance, plugin should take this chance to save the
     * editor reference so that it can call to any editor method or format API later.
     * @param editor The editor object
     */
    initialize: (editor: Editor) => void;

    /**
     * The last method that editor will call to a plugin before it is disposed.
     * Plugin can take this chance to clear the reference to editor. After this method is
     * called, plugin should not call to any editor method since it will result in error.
     */
    dispose: () => void;

    /**
     * @deprecated Use Editor.lockEvent() instead
     */
    willHandleEventExclusively?: (event: PluginEvent) => boolean;

    /**
     * Core method for a plugin. Once an event happens in editor, editor will call this
     * method of each plugin to handle the event as long as the event is not handled
     * exclusively by another plugin.
     * @param event The event to handle:
     */
    onPluginEvent?: (event: PluginEvent) => void;
}

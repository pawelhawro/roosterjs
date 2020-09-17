import EditorToolbarButton from './EditorToolbarButton';
import { EditorWithGui } from 'roosterjs-editor-gui';

/**
 * Interface of an editor plugin
 */
export default interface EditorGuiPlugin {
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
    initialize: (editor: EditorWithGui) => void;

    /**
     * The last method that editor will call to a plugin before it is disposed.
     * Plugin can take this chance to clear the reference to editor. After this method is
     * called, plugin should not call to any editor method since it will result in error.
     */
    dispose: () => void;

    /**
     * Create toolbar button
     */
    getButton(): EditorToolbarButton;
}

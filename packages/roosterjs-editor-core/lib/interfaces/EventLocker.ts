import EditorPlugin from './EditorPlugin';
import { PluginEvent } from 'roosterjs-editor-types';

export default interface EventLocker {
    plugin: EditorPlugin;
    shouldHandleEvent: (event: PluginEvent) => boolean;
}

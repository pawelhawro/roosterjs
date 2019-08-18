import TabPressPlugin from 'roosterjs-editor-gui/lib/EditorGui/plugins/TabPressPlugin';
import { ContentEdit, HyperLink, Paste } from 'roosterjs-editor-plugins';
import { EditorOptions, EditorPlugin } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui';

export default function createEditorWithGui(
    contentDiv: HTMLDivElement,
    mergeFields: string[],
    additionalPlugins?: EditorPlugin[],
    initialContent?: string
): EditorWithGui {
    let plugins: EditorPlugin[] = [
        new HyperLink(),
        new Paste(),
        new ContentEdit(),
        new TabPressPlugin(),
    ];

    if (additionalPlugins) {
        plugins = plugins.concat(additionalPlugins);
    }

    let options: EditorOptions = {
        plugins: plugins,
        initialContent: initialContent,
        defaultFormat: {},
    };

    //let editor = createEditor(contentDiv, additionalPlugins, initialContent);

    return new EditorWithGui(contentDiv, mergeFields, options);
}

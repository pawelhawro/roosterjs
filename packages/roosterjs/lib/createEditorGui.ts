import { ContentEdit, HyperLink, Paste } from 'roosterjs-editor-plugins';
import { EditorOptions, EditorPlugin } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui';
import TabPressPlugin from 'roosterjs-editor-gui/lib/EditorGui/plugins/TabPressPlugin';

export default function createEditorWithGui(
    contentDiv: HTMLDivElement,
    additionalPlugins?: EditorPlugin[],
    initialContent?: string
): EditorWithGui {
    let plugins: EditorPlugin[] = [new HyperLink(), new Paste(), new ContentEdit(), new TabPressPlugin()];

    if (additionalPlugins) {
        plugins = plugins.concat(additionalPlugins);
    }

    let options: EditorOptions = {
        plugins: plugins,
        initialContent: initialContent,
        defaultFormat: {
            //fontFamily: 'Calibri,Arial,Helvetica,sans-serif',
            //fontSize: '11pt',
            //textColor: '#000000',
        },
    };

    //let editor = createEditor(contentDiv, additionalPlugins, initialContent);

    return new EditorWithGui(contentDiv, options);
}

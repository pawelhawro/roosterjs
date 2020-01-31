import TabPressPlugin from 'roosterjs-editor-gui/lib/EditorGui/plugins/TabPressPlugin';
import { ContentEdit, HyperLink, Paste } from 'roosterjs-editor-plugins';
import { Editor, EditorOptions, EditorPlugin } from 'roosterjs-editor-core';
import { EditorWithGui } from 'roosterjs-editor-gui';
import {
    PluginEvent,
    PluginEventType,
    BeforePasteEvent,
    PasteOption,
} from 'roosterjs-editor-types';

export default function createEditorWithGui(
    contentDiv: HTMLDivElement,
    mergeFields: string[],
    additionalPlugins?: EditorPlugin[],
    initialContent?: string
): EditorWithGui {
    //new plugin initialize
    let plugins: EditorPlugin[] = [
        new HyperLink(),
        new Paste(null, {
            'data-mergefield': keepDataMergefield,
            href: keepHrefToVoid,
        }),
        new ContentEdit(),
        new TabPressPlugin(),
        new RemoveMergeFieldBackgroundOnPaste(),
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

function keepDataMergefield(value: string, element: HTMLElement, context: Object): string {
    return value;
}

function keepHrefToVoid(value: string, element: HTMLElement, context: Object): string {
    let attr = value.replace(/\s/g, '').toLowerCase();
    if (attr.startsWith('javascript:')) {
        return '#';
    }
    if (attr.startsWith('http://') || attr.startsWith('https://')) {
        return value;
    }
    return null;
}

// This plugin will insert an English word when user is inputting numbers
class RemoveMergeFieldBackgroundOnPaste implements EditorPlugin {
    private editor: Editor;

    getName() {
        return 'RemoveMergeFieldBackgroundOnPaste';
    }

    initialize(editor: Editor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.BeforePaste) {
            let beforePasteEvent = <BeforePasteEvent>event;

            if (beforePasteEvent.pasteOption == PasteOption.PasteHtml) {
                console.log('Paste data: ', beforePasteEvent, this.editor);

                var links = beforePasteEvent.fragment.querySelectorAll('a');

                console.log('Paste data: ', links);

                links.forEach(link => {
                    link.removeAttribute('style');
                });
            }
        }
    }
}

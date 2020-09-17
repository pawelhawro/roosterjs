import DOM from './DOM';
import { EditorWithGui } from 'roosterjs-editor-gui';

/**
 * Set indentation at selection
 * If selection contains bullet/numbering list, increase/decrease indentation will
 * increase/decrease the list level by one.
 * @param editor The editor instance
 * @param indentation The indentation option:
 * Indentation.Increase to increase indentation or Indentation.Decrease to decrease indentation
 */
export default function createSidebar(
    editor: EditorWithGui,
    title: string,
    content: HTMLDivElement
): HTMLDivElement {
    // prettier-ignore
    return DOM.div(
        'sidebar hidden',
        [
            DOM.div(
                'sidebar-title',
                [
                    DOM.text(title)
                ]
            ),
            DOM.div(
                'sidebar-content',
                [content]
            )
        ]
    );
}

import AlignCenterButton from './buttons/AlignCenterButton';
import AlignJustifyButton from './buttons/AlignJustifyButton';
import AlignLeftButton from './buttons/AlignLeftButton';
import AlignRightButton from './buttons/AlignRightButton';
import BoldButton from './buttons/BoldButton';
import BulletListButton from './buttons/BulletListButton';
import ClearStyleButton from './buttons/ClearStyleButton';
import DecreaseIndentButton from './buttons/DecreaseIndentButton';
import EditorGuiPlugin from './interfaces/EditorGuiPlugin';
import EditorGuiToolbarPlugin from './EditorGuiToolbarPlugin';
import EditorToolbarButton from './interfaces/EditorToolbarButton';
import FontSizeDropdownButton from './buttons/FontSizeDropdownButton';
import HeaderButton from './buttons/HeaderButton';
import IncreaseIndentButton from './buttons/IncreaseIndentButton';
import ItalicButton from './buttons/ItalicButton';
import MergeFieldsGuiPlugin from './guiplugins/MergeFieldsGuiPlugin';
import NumListButton from './buttons/NumListButton';
import PageBreakGuiPlugin from './guiplugins/PageBreakGuiPlugin';
import RedoButton from './buttons/RedoButton';
import Spacer from './buttons/Spacer';
import SubscriptButton from './buttons/SubscriptButton';
import SuperscriptButton from './buttons/SuperscriptButton';
import TableDropdownButton from './buttons/TableDropdownButton';
import UnderlineButton from './buttons/UnderlineButton';
import UndoButton from './buttons/UndoButton';
import ZoomButton from './buttons/ZoomButton';
import { Editor, EditorOptions } from 'roosterjs-editor-core';
import { FormatState } from 'roosterjs-editor-types';
import { TableResize } from 'roosterjs/lib';

export default class EditorWithGui {
    private editor: Editor;

    private contentDiv: HTMLDivElement;

    private toolbarDiv: HTMLDivElement;

    private editorWrapperDiv: HTMLDivElement;

    private editorDiv: HTMLDivElement;

    private workspaceDiv: HTMLDivElement;

    private toolbar: Array<EditorToolbarButton>;

    /**
     * Create instance of ContentEdit plugin
     * @param features An optional feature set to determine which features the plugin should provide
     */
    constructor(contentDiv: HTMLDivElement, mergefields: string[], options: EditorOptions = {}) {
        this.contentDiv = contentDiv;
        this.contentDiv.style.position = 'relative';

        this.toolbarDiv = <HTMLDivElement>document.createElement('div');
        this.toolbarDiv.className = 'roosterjs-toolbar';

        this.workspaceDiv = <HTMLDivElement>document.createElement('div');
        this.workspaceDiv.className = 'roosterjs-workspace';

        this.editorWrapperDiv = <HTMLDivElement>document.createElement('div');
        this.editorWrapperDiv.className = 'roosterjs-wrapper-editor';
        this.editorWrapperDiv.style.position = 'relative';

        this.editorDiv = <HTMLDivElement>document.createElement('div');
        this.editorDiv.className = 'roosterjs-editor';

        this.editorWrapperDiv.appendChild(this.editorDiv);

        this.workspaceDiv.appendChild(this.editorWrapperDiv);

        this.contentDiv.appendChild(this.toolbarDiv);
        this.contentDiv.appendChild(this.workspaceDiv);

        let toolbarplugin = new EditorGuiToolbarPlugin();
        toolbarplugin.setEditorGui(this);

        options.plugins.push(toolbarplugin);
        options.plugins.push(new TableResize());

        let guiplugins = new Array<EditorGuiPlugin>();

        guiplugins.push(new PageBreakGuiPlugin('newpage'));
        guiplugins.push(new MergeFieldsGuiPlugin(mergefields, 'merge-field'));

        for (let g of guiplugins) {
            g.initialize(this);
        }
        //options.plugins.push(new TabPressPlugin());

        this.editor = new Editor(this.editorDiv, options);

        this.toolbar = new Array();
        this.toolbar.push(
            new BoldButton(this.editor),
            new ItalicButton(this.editor),
            new UnderlineButton(this.editor),
            new SubscriptButton(this.editor),
            new SuperscriptButton(this.editor),
            new Spacer(this.editor),

            new FontSizeDropdownButton(this.editor),
            new Spacer(this.editor),
            new HeaderButton(this.editor),
            new Spacer(this.editor),

            new BulletListButton(this.editor),
            new NumListButton(this.editor),
            new DecreaseIndentButton(this.editor),
            new IncreaseIndentButton(this.editor),
            new Spacer(this.editor),

            new AlignLeftButton(this.editor),
            new AlignCenterButton(this.editor),
            new AlignRightButton(this.editor),
            new AlignJustifyButton(this.editor),
            new Spacer(this.editor),

            new TableDropdownButton(this.editor),
            new Spacer(this.editor),

            new ClearStyleButton(this.editor),
            new Spacer(this.editor),

            new UndoButton(this.editor),
            new RedoButton(this.editor),
            new Spacer(this.editor),
            new ZoomButton(this)
        );

        if (guiplugins) {
            this.toolbar.push(new Spacer(this.editor));

            for (let g of guiplugins) {
                this.toolbar.push(g.getButton());
            }
        }

        this.toolbar.forEach(e => {
            e.append(this.toolbarDiv);
        });
    }

    /**
     * getEditor
     */
    public getEditor() {
        return this.editor;
    }

    public updateState(state: FormatState) {
        this.toolbar.forEach(element => {
            element.updateState(state);
        });
    }

    public getContentDiv() {
        return this.contentDiv;
    }

    public getEditorDiv() {
        return this.editorDiv;
    }

    public getEditorWrapper() {
        return this.editorWrapperDiv;
    }

    public getWorkspace() {
        return this.workspaceDiv;
    }
}

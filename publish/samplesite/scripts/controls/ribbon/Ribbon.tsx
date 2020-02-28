import * as React from 'react';
import MainPaneBase from '../MainPaneBase';
import RibbonButton from './RibbonButton';
import ribbonButtons from './ribbonButtons';
import RibbonPlugin from './RibbonPlugin';
import { Browser } from 'roosterjs-editor-dom';
import { getFormatState } from 'roosterjs-editor-api';

let styles = require('./Ribbon.scss');

export interface RibbonProps {
    plugin: RibbonPlugin;
    isPopout?: boolean;
    className?: string;
}

export default class Ribbon extends React.Component<RibbonProps, {}> {
    render() {
        let plugin = this.props.plugin;
        let editor = plugin.getEditor();
        let format = editor && getFormatState(editor);
        return (
            <div className={styles.ribbon + ' ' + (this.props.className || '')}>
                {Object.keys(ribbonButtons).map(key => (
                    <RibbonButton
                        key={key}
                        plugin={plugin}
                        format={format}
                        button={ribbonButtons[key]}
                        onClicked={this.onButtonClicked}
                    />
                ))}
                <button onClick={this.onSave} className={styles.textButton}>
                    Export
                </button>
                <button onClick={this.onClear} className={styles.textButton}>
                    Clear
                </button>

                {!this.props.isPopout && (Browser.isChrome || Browser.isFirefox) && (
                    <button onClick={this.onPopOut} className={styles.textButton}>
                        PopOut
                    </button>
                )}
            </div>
        );
    }

    private onSave = () => {
        let editor = this.props.plugin.getEditor();
        let w = window.open();
        w.document.write(editor.getContent());
    };

    private onClear = () => {
        let editor = this.props.plugin.getEditor();
        editor.addUndoSnapshot(() => {
            editor.setContent('');
        });
    };

    private onPopOut = () => {
        MainPaneBase.getInstance().popout();
    };

    private onButtonClicked = () => {
        this.forceUpdate();
    };
}

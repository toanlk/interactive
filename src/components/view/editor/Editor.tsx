import * as React from 'react';
import { observer } from 'mobx-react';

//// Props and States /////////////////////////////////////////////////////////////////////

export interface EditorState { }
export interface EditorProps extends React.Props<Editor> { store: any }

//// Class ///////////////////////////////////////////////////////////////////////////////
@observer
export class Editor extends React.Component<EditorProps, EditorState> {

    constructor(props: EditorProps) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): EditorState {
        return {}
    }

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {

        let css = this.props.store.getCssText();

        return (
            <div className="component-editor">
                <textarea onChange={() => this.onEdit(event)}>{css}</textarea>
                <span className="label">Number of styles: {this.props.store.numberOfObjects}</span>
            </div>
        );
    }

    //// logic ///////////////////////////////////////////////////////////////////////////////

    onEdit(e: any) {
        //console.log('Editor::onEdit');

        const { value } = e.target;
        //console.log(value);

        try {
            this.props.store.updateStyles(value);
        } catch (e) {
            console.error(e);
        }
    }
}
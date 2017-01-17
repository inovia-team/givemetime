import React from 'react'
import 'medium-draft/lib/index.css'
import {
    Editor,
    ImageSideButton,
    createEditorState,
} from 'medium-draft'

import { stateToHTML } from 'draft-js-export-html'

export class TextEditor extends React.Component {
    constructor (props) {
        super(props)

        this.sideButtons = [{
            title: 'Image',
            component: ImageSideButton,
        }]

        this.state = {
            editorState: createEditorState(), // for empty content
        }

        this.onChange = editorState => {
            this.setState({ editorState })
            const html = stateToHTML(editorState.getCurrentContent())
            this.props.input.onChange(JSON.stringify(html))
        }
    }

    componentDidMount () {
        this.refs.editor.focus()
    }
    render () {
        return (
            <Editor
                ref="editor"
                editorState={this.state.editorState}
                onChange={this.onChange}
                sideButtons={this.sideButtons} />
        )
    }
}

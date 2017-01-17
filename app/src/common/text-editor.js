import React, { Component, PropTypes } from 'react'
import 'medium-draft/lib/index.css'
import {
    Editor,
    ImageSideButton,
} from 'medium-draft'

import {
  EditorState,
} from 'draft-js'


import { convertToHTML } from 'draft-convert'

export class TextEditor extends Component {
    constructor (props) {
        super(props)

        this.sideButtons = [{
            title: 'Image',
            component: ImageSideButton,
        }]

        this.state = {
            editorState: props.data ? EditorState.createWithContent(props.data) : EditorState.createEmpty(),
        }

        this.onChange = editorState => {
            this.setState({ editorState })
            const html = convertToHTML(editorState.getCurrentContent())
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

TextEditor.propTypes = {
    input: PropTypes.object,
    data: PropTypes.object,
}

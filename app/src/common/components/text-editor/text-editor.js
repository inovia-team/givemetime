import React, { Component, PropTypes } from 'react'
import './draft.css'

import { EditorState } from 'draft-js'
import { convertToHTML } from 'draft-convert'

import {
    linkifyPlugin,
    inlineToolbarPlugin,
    emojiPlugin,
    hashtagPlugin,
    undoPlugin,
    Editor,
    InlineToolbar,
    EmojiSuggestions,
    UndoButton,
    RedoButton,
} from './plugins'

const plugins = [linkifyPlugin, inlineToolbarPlugin, emojiPlugin, hashtagPlugin, undoPlugin]

export class TextEditor extends Component {
    constructor (props) {
        super(props)

        this.state = {
            editorState: props.data ? EditorState.createWithContent(props.data) : EditorState.createEmpty(),
        }

        this.onChange = editorState => {
            this.setState({ editorState })
            const html = convertToHTML(editorState.getCurrentContent())
            this.props.input.onChange(JSON.stringify(html))
        }
    }

    render () {
        return (
            <div className='editor'>
                <Editor
                    ref={element => { this.editor = element }}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins} />
                <InlineToolbar />
                <EmojiSuggestions />
                <UndoButton />
                <RedoButton />
            </div>
        )
    }
}

TextEditor.propTypes = {
    input: PropTypes.object,
    data: PropTypes.object,
}

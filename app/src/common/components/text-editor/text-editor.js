import React, { Component, PropTypes } from 'react'
import './draft.css'

import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'


import { EditorState } from 'draft-js'
import ImageAdd from './image-add'

import {
    linkifyPlugin,
    inlineToolbarPlugin,
    emojiPlugin,
    hashtagPlugin,
    undoPlugin,
    imagePlugin,
    Editor,
    InlineToolbar,
    EmojiSuggestions,
    UndoButton,
    RedoButton,
} from './plugins'

const plugins = [linkifyPlugin, inlineToolbarPlugin, emojiPlugin, hashtagPlugin, undoPlugin, imagePlugin]

export class TextEditor extends Component {
    constructor (props) {
        super(props)

        this.state = {
            editorState: props.data ? EditorState.createWithContent(stateFromHTML(props.data)) : EditorState.createEmpty(),
        }

        this.onChange = editorState => {
            this.setState({ editorState })
            let html = stateToHTML(editorState.getCurrentContent())
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
                <ImageAdd
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    modifier={imagePlugin.addImage}
                />
            </div>
        )
    }
}

TextEditor.propTypes = {
    input: PropTypes.object,
    data: PropTypes.string,
}

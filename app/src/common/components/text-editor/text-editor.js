import React, { Component, PropTypes } from 'react'
import './draft.css'

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
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
            editorState: props.data ? EditorState.createWithContent(convertFromRaw(props.data)) : EditorState.createEmpty(),
        }

        this.onChange = editorState => {
            this.setState({ editorState })
            this.props.input.onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
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
    data: PropTypes.object,
}

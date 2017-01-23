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
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    Editor,
    InlineToolbar,
    EmojiSuggestions,
    UndoButton,
    RedoButton,
    AlignmentTool,
} from './plugins'

const plugins = [
    linkifyPlugin,
    inlineToolbarPlugin,
    emojiPlugin,
    hashtagPlugin,
    undoPlugin,
    imagePlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
]

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

    focus () {
        this.editor.focus()
    }

    render () {
        return (
            <div className='editor'>
                <Editor
                    ref={element => { this.editor = element }}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    onClick={this.focus.bind(this)} />
                <InlineToolbar />
                <EmojiSuggestions />
                <UndoButton />
                <RedoButton />
                <ImageAdd
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    modifier={imagePlugin.addImage}
                />
                <AlignmentTool />
            </div>
        )
    }
}

TextEditor.propTypes = {
    input: PropTypes.object,
    data: PropTypes.object,
}

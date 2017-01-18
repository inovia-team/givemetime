import React, { Component, PropTypes } from 'react'
import './draft.css'

import createUndoPlugin from 'draft-js-undo-plugin'
const undoPlugin = createUndoPlugin()
const { UndoButton, RedoButton } = undoPlugin

import 'draft-js-hashtag-plugin/lib/plugin.css'
import createHashtagPlugin from 'draft-js-hashtag-plugin'
const hashtagPlugin = createHashtagPlugin()
import 'draft-js-emoji-plugin/lib/plugin.css'
import createEmojiPlugin from 'draft-js-emoji-plugin'
const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
var Hello = React.createClass({
    propTypes: {
        href: PropTypes.string,
    },
    displayName: 'Hello',
    render: function () {
        return <a {...this.props} onClick={() => window.open(this.props.href, '_blank')} />
    },
})
const linkifyPlugin = createLinkifyPlugin({ component: Hello })
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin'
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons'
const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlineOneButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
    ],
})
const { InlineToolbar } = inlineToolbarPlugin
import 'draft-js-linkify-plugin/lib/plugin.css'
import {
  EditorState,
} from 'draft-js'

import { convertToHTML } from 'draft-convert'
export class TextEditor extends Component {
    constructor (props) {
        super(props)

        this.state = {
            editorState: props.data ? EditorState.createWithContent(props.data) : EditorState.createEmpty(),
        }

        this.onChange = editorState => {
            this.setState({ editorState })
            const html = convertToHTML(editorState.getCurrentContent())
            console.log(html)
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
                    plugins={[linkifyPlugin, inlineToolbarPlugin, emojiPlugin, hashtagPlugin, undoPlugin]} />
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

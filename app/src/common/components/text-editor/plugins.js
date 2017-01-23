import React, { PropTypes } from 'react'

// Import all plugins

import createHashtagPlugin from 'draft-js-hashtag-plugin'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createUndoPlugin from 'draft-js-undo-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin'

import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from './custom-plugins/resize'

// Import all plugins styles

import 'draft-js-hashtag-plugin/lib/plugin.css'
import 'draft-js-emoji-plugin/lib/plugin.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-linkify-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-undo-plugin/lib/plugin.css'

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

// Custom component to make link dynamically clickable

var LinkComponent = React.createClass({
    propTypes: {
        href: PropTypes.string,
    },
    displayName: 'LinkComponent',
    render: function () {
        return <a {...this.props} onClick={() => window.open(this.props.href, '_blank')} />
    },
})

// Create and initialize components

const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
// const dndPlugin = createBlockDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const hashtagPlugin = createHashtagPlugin()
const undoPlugin = createUndoPlugin()
//const imagePlugin = createImagePlugin()
const emojiPlugin = createEmojiPlugin()
const linkifyPlugin = createLinkifyPlugin({ component: LinkComponent })
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
import { composeDecorators } from 'draft-js-plugins-editor'
const { EmojiSuggestions } = emojiPlugin
const { UndoButton, RedoButton } = undoPlugin
const { InlineToolbar } = inlineToolbarPlugin
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator
 // dndPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator })
// Export plugin and components to text-edit

export {
    linkifyPlugin,
    inlineToolbarPlugin,
    emojiPlugin,
    hashtagPlugin,
    imagePlugin,
    undoPlugin,
    Editor,
    InlineToolbar,
    EmojiSuggestions,
    UndoButton,
    RedoButton, focusPlugin, alignmentPlugin, resizeablePlugin, AlignmentTool,
}

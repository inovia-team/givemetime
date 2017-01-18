import React, { Component } from 'react'

export default class ImageAdd extends Component {

    onChange (e) {
        const { editorState, onChange } = this.props
        const file = e.target.files[0]
        console.log('LOL ', file)
        // if (this.parseUrl !== undefined) {
        //     this.parseUrl(file, editorState, onChange)
        // } else {
        //     const url = URL.createObjectURL(file)
        //     onChange(modifier(editorState, url))
        // }
    }

    addImageFile (parseUrl) {
        this.input.click()
        this.parseUrl = parseUrl
    }

    render () {
        return (
            <div>
            <input
                type="file"
                ref={c => { this.input = c }}
                onChange={e => this.onChange(e)}
                style={{ display: 'none' }}
            />
            </div>
        )
    }
}

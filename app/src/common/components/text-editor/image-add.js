import React, { Component } from 'react'
import './image-add.css'

export default class ImageAdd extends Component {
  // Start the popover closed
    constructor (props) {
        super(props)
        this.state = {
            url: '',
            open: false,
        }
    }

  // When the popover is open and users click anywhere on the page,
  // the popover should close
    componentDidMount () {
        document.addEventListener('click', this.closePopover.bind(this))
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.closePopover.bind(this))
    }

  // Note: make sure whenever a click happens within the popover it is not closed
    onPopoverClick () {
        this.preventNextClose = true
    }

    openPopover () {
        if (!this.state.open) {
            this.preventNextClose = true
            this.setState({
                open: true,
            })
        }
    }

    closePopover () {
        if (!this.preventNextClose && this.state.open) {
            this.setState({
                open: false,
            })
        }

        this.preventNextClose = false
    }

    addImage () {
        const { editorState, onChange } = this.props
        onChange(this.props.modifier(editorState, this.state.url))
    }

    changeUrl (evt) {
        this.setState({ url: evt.target.value })
    }

    render () {
        const popoverClassName = this.state.open ?
            'addImagePopover' :
            'addImageClosedPopover'
        const buttonClassName = this.state.open ?
            'addImagePressedButton' :
            'addImageButton'
        return (
            <div className='addImage'>
                <button
                  className={buttonClassName}
                  onMouseUp={this.openPopover.bind(this)}
                  type="button"
                >
              +
            </button>
            <div
              className={popoverClassName}
              onClick={this.onPopoverClick.bind(this)}
            >
              <input
                type="text"
                placeholder="Paste the image url …"
                className='addImageInput'
                onChange={this.changeUrl.bind(this)}
                value={this.state.url}
              />
              <button
                className='addImageConfirmButton'
                type="button"
                onClick={this.addImage.bind(this)}
              >
                Add
              </button>
            </div>
          </div>
        )
    }
}

import React, { BaseSyntheticEvent } from 'react'
import { TodoState } from '../interfaces'
import Calendar from '../Calendar'
import List from '../List'
import NewItemInput from '../NewItemInput'

class Todo extends React.Component<{}, TodoState> {
  newItemInput: HTMLInputElement | null

  constructor(props: any) {
    super(props)

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnKeydown = this.handleOnKeydown.bind(this)

    this.addTodoItem = this.addTodoItem.bind(this)
    this.setTextInputRef = this.setTextInputRef.bind(this)

    this.newItemInput = null

    this.state = {
      items: [],
      text: '',
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeydown)
  }

  handleOnChange(event: BaseSyntheticEvent) {
    const {
      value,
    } = event.target

    this.setState({
      text: value,
    })
  }

  handleOnBlur(event: BaseSyntheticEvent) {
    const {
      text,
    } = this.state

    if (!text) {
      return
    }

    this.addTodoItem()
  }

  handleOnKeydown(event: KeyboardEvent) {
    const {
      text,
    } = this.state

    const isEnterKeyPressed = event.key === 'Enter'
    if (!text || !isEnterKeyPressed) {
      return
    }

    this.addTodoItem()
  }

  addTodoItem() {
    const {
      items,
      text,
    } = this.state

    items.push(text)

    this.setState({
      items,
      text: '',
    })

    const {
      newItemInput,
    } = this

    if (!newItemInput) {
      return
    }
    
    newItemInput.value = ''
  }

  setTextInputRef(element: HTMLInputElement) {
    this.newItemInput = element
  }

  render() {
    const {
      items
    } = this.state

    return (
      <div className="Todo">
        <Calendar />
        <List
          items={items}
        />
        <NewItemInput
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          setTextInputRef={this.setTextInputRef}
        />
      </div>
    )
  }
}

export default Todo
import React, { BaseSyntheticEvent } from 'react'
import { TodoState } from '../interfaces'
import Calendar from '../Calendar'
import List from '../List'
import NewItem from '../NewItem'

class Todo extends React.Component<{}, TodoState> {
  newItemInput: HTMLInputElement | null

  constructor(props: any) {
    super(props)

    this.handleNewItemInputOnChange = this.handleNewItemInputOnChange.bind(this)
    this.handleNewItemInputOnBlur = this.handleNewItemInputOnBlur.bind(this)
    this.handleListItemComplete = this.handleListItemComplete.bind(this)
    this.handleListItemSelect = this.handleListItemSelect.bind(this)
    this.handleListItemRemove = this.handleListItemRemove.bind(this)
    this.handleOnKeydown = this.handleOnKeydown.bind(this)

    this.addTodoItem = this.addTodoItem.bind(this)
    this.setNewItemInputRef = this.setNewItemInputRef.bind(this)

    this.newItemInput = null

    this.state = {
      items: [],
      text: '',
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeydown)
  }

  handleNewItemInputOnChange(event: BaseSyntheticEvent) {
    const { value } = event.target
    this.setState({ text: value })
  }

  handleNewItemInputOnBlur() {
    const { text } = this.state
    if (!text) {
      return
    }

    this.addTodoItem()
  }

  handleListItemComplete(event: BaseSyntheticEvent) {
    console.log(event)
  }

  handleListItemRemove(event: BaseSyntheticEvent) {
    const { dataset } = event.target
    const { index } = dataset
    const { items } = this.state

    items.splice(index, 1)
    this.setState({ items })
  }

  handleListItemSelect(event: BaseSyntheticEvent) {
    console.log(event)
  }

  handleOnKeydown(event: KeyboardEvent) {
    const { text } = this.state
    const { key } = event
    const isEnterKeyPressed = key === 'Enter'
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

    const { newItemInput } = this
    if (!newItemInput) {
      return
    }
    
    newItemInput.value = ''
  }

  setNewItemInputRef(element: HTMLInputElement | null) {
    this.newItemInput = element
  }

  render() {
    const { items } = this.state

    return (
      <div className="Todo">
        <Calendar />
        <List
          handleListItemComplete={this.handleListItemComplete}
          handleListItemRemove={this.handleListItemRemove}
          handleListItemSelect={this.handleListItemSelect}
          items={items}
        />
        <NewItem
          handleNewItemInputOnChange={this.handleNewItemInputOnChange}
          handleNewItemInputOnBlur={this.handleNewItemInputOnBlur}
          setNewItemInputRef={this.setNewItemInputRef}
        />
      </div>
    )
  }
}

export default Todo
import React, { BaseSyntheticEvent } from 'react'
import { TodoState } from '../interfaces'
import Calendar from '../Calendar'
import List from '../List'
import NewItem from '../NewItem'

class Todo extends React.Component<{}, TodoState> {
  listItemEditInput: HTMLInputElement | null;
  newItemInput: HTMLInputElement | null;

  constructor(props: any) {
    super(props)

    this.handleNewItemInputOnChange = this.handleNewItemInputOnChange.bind(this)
    this.handleNewItemInputOnBlur = this.handleNewItemInputOnBlur.bind(this)
    this.handleListItemComplete = this.handleListItemComplete.bind(this)
    this.handleListItemSelect = this.handleListItemSelect.bind(this)
    this.handleListItemRemove = this.handleListItemRemove.bind(this)
    this.handleOnKeydown = this.handleOnKeydown.bind(this)

    this.addTodoItem = this.addTodoItem.bind(this)
    this.setListItemEditInputRef = this.setListItemEditInputRef.bind(this)
    this.setNewItemInputRef = this.setNewItemInputRef.bind(this)

    this.newItemInput = null
    this.listItemEditInput = null

    this.state = {
      items: {
        completed: [],
        inProgress: [],
      },
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
    const { inProgress } = items

    inProgress.splice(index, 1)
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
    const {
      completed,
      inProgress,
    } = items 

    inProgress.push(text)
    this.setState({
      items: {
        completed,
        inProgress,
      },
      text: '',
    })

    const { newItemInput } = this
    if (!newItemInput) {
      return
    }
    
    newItemInput.value = ''
  }

  setListItemEditInputRef(element: HTMLInputElement | null) {
    this.listItemEditInput = element
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
          setListItemEditInputRef={this.setListItemEditInputRef}
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
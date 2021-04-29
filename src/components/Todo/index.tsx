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
    this.handleListItemEditOnChange = this.handleListItemEditOnChange.bind(this)
    this.handleListItemComplete = this.handleListItemComplete.bind(this)
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
      newItem: '',
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeydown)
  }

  addTodoItem() {
    const { newItem } = this.state
    const { newItemInput } = this
    if (!newItem || !newItemInput) {
      return
    }

    const {
      inProgress,
      ...rest
    } = this.state.items

    inProgress.push(newItem)
    this.setState({
      items: {
        inProgress,
        ...rest,
      },
      newItem: '',
    })

    newItemInput.value = ''
  }

  handleListItemEditOnChange(event: BaseSyntheticEvent) {
    const { index } = event.target.dataset
    const { value } = event.target
    const {
      inProgress,
      ...rest
    } = this.state.items

    let inProgressEdited = inProgress.slice()
    inProgressEdited[index] = value
    this.setState({
      items: {
        inProgress: inProgressEdited,
        ...rest
      }
    })
  }

  handleNewItemInputOnChange(event: BaseSyntheticEvent) {
    const { value } = event.target
    this.setState({ newItem: value })
  }

  handleNewItemInputOnBlur() {
    const { newItem } = this.state
    if (!newItem) {
      return
    }

    this.addTodoItem()
  }

  handleListItemComplete(event: BaseSyntheticEvent) {
    const { completed, inProgress } = this.state.items
    const { index } = event.target.dataset

    completed.push(inProgress[index])
    inProgress.splice(index, 1)

    this.setState({
      items: {
        completed,
        inProgress,
      }
    })
  }

  handleListItemRemove(event: BaseSyntheticEvent) {
    const { index } = event.target.dataset
    const { completed, inProgress } = this.state.items

    inProgress.splice(index, 1)

    this.setState({
      items: {
        completed,
        inProgress,
      }
    })
  }

  handleOnKeydown(event: KeyboardEvent) {
    const { newItem } = this.state
    const { key } = event
    const isEnterKeyPressed = key === 'Enter'
    if (!newItem || !isEnterKeyPressed) {
      return
    }

    this.addTodoItem()
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
          items={items}
          handleListItemEditOnChange={this.handleListItemEditOnChange}
          handleListItemComplete={this.handleListItemComplete}
          handleListItemRemove={this.handleListItemRemove}
          setListItemEditInputRef={this.setListItemEditInputRef}
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
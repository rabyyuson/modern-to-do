import React, { BaseSyntheticEvent, ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react'
import { TodoState } from '../interfaces'
import Calendar from '../Calendar'
import List from '../List'
import NewItem from '../NewItem'

class Todo extends React.Component<{}, TodoState> {
  listItemEditInput: HTMLInputElement | null;
  newItemInput: HTMLInputElement | null;

  constructor(props: {}) {
    super(props)

    this.handleNewItemInputOnChange = this.handleNewItemInputOnChange.bind(this)
    this.handleNewItemInputOnBlur = this.handleNewItemInputOnBlur.bind(this)
    this.handleNewItemInputOnKeyUp = this.handleNewItemInputOnKeyUp.bind(this)
    this.handleListItemEditOnChange = this.handleListItemEditOnChange.bind(this)
    this.handleListItemComplete = this.handleListItemComplete.bind(this)
    this.handleListItemRemove = this.handleListItemRemove.bind(this)
    this.handleListItemRemovedRestore = this.handleListItemRemovedRestore.bind(this)

    this.addTodoItem = this.addTodoItem.bind(this)
    this.setListItemEditInputRef = this.setListItemEditInputRef.bind(this)
    this.setNewItemInputRef = this.setNewItemInputRef.bind(this)

    this.newItemInput = null
    this.listItemEditInput = null

    this.state = {
      items: {
        completed: [],
        inProgress: [],
        removed: [],
      },
      newItem: '',
    }
  }

  addTodoItem() {
    const { newItem } = this.state
    const { newItemInput } = this
    if (!newItem || !newItemInput) {
      return
    }

    const { inProgress, ...rest } = this.state.items

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
    console.log(event)
    const { index } = event.target.dataset
    const { value } = event.target
    const { inProgress, ...rest } = this.state.items

    inProgress[index] = value
    this.setState({
      items: {
        inProgress,
        ...rest
      }
    })
  }

  handleListItemComplete(event: BaseSyntheticEvent) {
    const { completed, inProgress, ...rest } = this.state.items
    const { index } = event.target.dataset

    completed.push(inProgress[index])
    this.setState({
      items: {
        completed,
        inProgress,
        ...rest,
      }
    })
  }

  handleListItemRemove(event: BaseSyntheticEvent) {
    const { index } = event.target.dataset
    const { inProgress, removed, ...rest } = this.state.items

    removed.push(inProgress[index])
    this.setState({
      items: {
        inProgress,
        removed,
        ...rest
      }
    })
  }

  handleListItemRemovedRestore(event: BaseSyntheticEvent) {
    const { index } = event.target.dataset
    const { removed, ...rest } = this.state.items

    removed.splice(index, 1)
    this.setState({
      items: {
        removed,
        ...rest
      }
    })
  }

  handleNewItemInputOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    this.setState({ newItem: value })
  }

  handleNewItemInputOnBlur(event: FocusEvent<HTMLInputElement>) {
    const { newItem } = this.state
    if (!newItem) {
      return
    }

    this.addTodoItem()
  }

  handleNewItemInputOnKeyUp(event: KeyboardEvent<HTMLInputElement>) {
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
          handleListItemRemovedRestore={this.handleListItemRemovedRestore}
          setListItemEditInputRef={this.setListItemEditInputRef}
        />
        <NewItem
          handleNewItemInputOnChange={this.handleNewItemInputOnChange}
          handleNewItemInputOnBlur={this.handleNewItemInputOnBlur}
          handleNewItemInputOnKeyUp={this.handleNewItemInputOnKeyUp}
          setNewItemInputRef={this.setNewItemInputRef}
        />
      </div>
    )
  }
}

export default Todo
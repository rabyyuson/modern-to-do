import React, {
  BaseSyntheticEvent,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent
} from 'react'
import { TodoState } from '../interfaces'
import Calendar from '../Calendar'
import ListNavigation from '../ListNavigation'
import List from '../List'
import './index.scss'

class Todo extends React.Component<{}, TodoState> {
  listItemEditInput: HTMLInputElement | null;
  newItemInput: HTMLInputElement | null;

  constructor(props: {}) {
    super(props)

    this.handleNewItemInputOnChange = this.handleNewItemInputOnChange.bind(this)
    this.handleNewItemInputOnBlur = this.handleNewItemInputOnBlur.bind(this)
    this.handleNewItemInputOnKeyUp = this.handleNewItemInputOnKeyUp.bind(this)
    this.handleListItemEditOnKeyUp = this.handleListItemEditOnKeyUp.bind(this)
    this.handleListItemComplete = this.handleListItemComplete.bind(this)
    this.handleListItemRemove = this.handleListItemRemove.bind(this)
    this.handleListItemRemovedRestore = this.handleListItemRemovedRestore.bind(this)
    this.handleListNavigationEllipsisClick = this.handleListNavigationEllipsisClick.bind(this)
    this.handleListNavigationItemClick = this.handleListNavigationItemClick.bind(this)

    this.addNewItem = this.addNewItem.bind(this)
    this.setListItemEditInputRef = this.setListItemEditInputRef.bind(this)
    this.setNewItemInputRef = this.setNewItemInputRef.bind(this)

    this.newItemInput = null
    this.listItemEditInput = null

    this.state = {
      items: {
        completed: [
          'Build a modern To Do app'
        ],
        inProgress: [
          'Workout for 30 minutes at the gym',
          'Buy groceries (milk, vegetables, fruits, fish)',
          'Clean the house and backyard',
          'Take the car to the auto shop for an oil change',
        ],
        removed: [],
      },
      newItem: '',
      view: {
        open: false,
        selected: 'inProgress',
      },
    }
  }

  componentDidMount() {
    this.newItemInput?.focus()
  }

  addNewItem({ newItem } : { newItem: string }) {
    const { newItemInput } = this
    if (!newItemInput) {
      return
    }

    const { completed, inProgress, removed } = this.state.items

    inProgress.push(newItem)
    this.setState({
      items: {
        completed,
        inProgress,
        removed,
      },
      newItem: '',
    })

    newItemInput.value = ''
  }

  handleListItemEditOnKeyUp(event: BaseSyntheticEvent & KeyboardEvent<HTMLInputElement>) {
    const { index } = event.target.dataset
    const { value } = event.target
    const { completed, inProgress, removed } = this.state.items

    inProgress[index] = value
    this.setState({
      items: {
        completed,
        inProgress,
        removed,
      }
    })

    const { key } = event
    const isEnterKeyPressed = key === 'Enter'
    if (!isEnterKeyPressed) {
      return
    }

    this.handleListItemComplete(event)
  }

  handleListItemComplete(event: BaseSyntheticEvent) {
    const { completed, inProgress, removed } = this.state.items

    const { index } = event.target.dataset
    let currentIndex = index
    
    if (!currentIndex) {
      const iconParent = event.target.closest('.List-in-progress-item-complete')
      if (iconParent) {
        currentIndex = iconParent.dataset.index
      }
    }

    completed.push(inProgress[currentIndex])
    this.setState({
      items: {
        completed,
        inProgress,
        removed,
      }
    })
  }

  handleListItemRemove(event: BaseSyntheticEvent) {
    const { completed, inProgress, removed } = this.state.items

    const { index } = event.target.dataset
    let currentIndex = index
    
    if (!currentIndex) {
      const iconParent = event.target.closest('.List-in-progress-item-remove')
      if (iconParent) {
        currentIndex = iconParent.dataset.index
      }
    }

    removed.push(inProgress[currentIndex])
    this.setState({
      items: {
        completed,
        inProgress,
        removed,
      }
    })
  }

  handleListItemRemovedRestore(event: BaseSyntheticEvent) {
    const { completed, inProgress, removed } = this.state.items

    const { index } = event.target.dataset
    let currentIndex = index
    
    if (!currentIndex) {
      const iconParent = event.target.closest('.List-in-progress-item-remove')
      if (iconParent) {
        currentIndex = iconParent.dataset.index
      }
    }

    removed.splice(currentIndex, 1)
    this.setState({
      items: {
        completed,
        inProgress,
        removed,
      }
    })
  }

  handleListNavigationEllipsisClick(event: BaseSyntheticEvent) {
    const { open, ...rest } = this.state.view
    this.setState({ view: {
      open: true,
      ...rest
    }})
  }

  handleListNavigationItemClick(event: BaseSyntheticEvent) {
    const { viewname } = event.target.dataset
    this.setState({
      view: {
        open: false,
        selected: viewname,
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

    this.addNewItem({ newItem })
  }

  handleNewItemInputOnKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    const { newItem } = this.state
    const { key } = event
    const isEnterKeyPressed = key === 'Enter'
    if (!newItem || !isEnterKeyPressed) {
      return
    }

    this.addNewItem({ newItem })
  }

  setListItemEditInputRef(element: HTMLInputElement | null) {
    this.listItemEditInput = element
  }

  setNewItemInputRef(element: HTMLInputElement | null) {
    this.newItemInput = element
  }

  render() {
    const { items, view } = this.state

    return (
      <div className="Todo">
        <Calendar />
        <ListNavigation
          items={items}
          view={view}
          handleListNavigationEllipsisClick={this.handleListNavigationEllipsisClick}
          handleListNavigationItemClick={this.handleListNavigationItemClick}
        />
        <List
          items={items}
          view={view}
          handleListItemEditOnKeyUp={this.handleListItemEditOnKeyUp}
          handleListItemComplete={this.handleListItemComplete}
          handleListItemRemove={this.handleListItemRemove}
          handleListItemRemovedRestore={this.handleListItemRemovedRestore}
          handleNewItemInputOnChange={this.handleNewItemInputOnChange}
          handleNewItemInputOnBlur={this.handleNewItemInputOnBlur}
          handleNewItemInputOnKeyUp={this.handleNewItemInputOnKeyUp}
          setListItemEditInputRef={this.setListItemEditInputRef}
          setNewItemInputRef={this.setNewItemInputRef}
        />
      </div>
    )
  }
}

export default Todo
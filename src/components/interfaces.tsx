export interface TodoState {
  items: {
    completed: (string | undefined)[];
    inProgress: (string | undefined)[];
    removed: (string | undefined)[];
  };
  newItem: string | undefined;
}

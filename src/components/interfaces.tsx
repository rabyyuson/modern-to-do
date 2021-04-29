export interface TodoState {
  items: {
    completed: (string | undefined)[];
    inProgress: (string | undefined)[];
  };
  newItem: string | undefined;
}

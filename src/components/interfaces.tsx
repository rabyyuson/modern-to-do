export interface TodoState {
  items: {
    completed: [string?];
    inProgress: [string?];
  };
  text: string;
}

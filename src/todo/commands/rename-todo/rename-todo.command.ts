export class RenameTodoCommand {
  constructor(public readonly todoId: string, public readonly newTitle) {}
}

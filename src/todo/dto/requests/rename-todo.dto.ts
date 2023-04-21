export class RenameTodoRequestDTO {
  constructor(public readonly todoId: string, public readonly newTitle) {}
}

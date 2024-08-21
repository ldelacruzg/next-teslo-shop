export class NotUserSessionException extends Error {
  constructor(message: string = "There is not user session") {
    super(message)
  }
}

export class NotExistenceException extends Error {
  constructor(message: string = "There is not existence") {
    super(message)
  }
}

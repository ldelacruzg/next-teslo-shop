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

export class PaypalUnauthrorizeException extends Error {
  constructor(message: string = "There is not PayPal verification token") {
    super(message)
  }
}

export class PayPalOrderStatusException extends Error {
  constructor(message: string = "Failed to get order status") {
    super(message)
  }
}

export class UnauthorizedException extends Error {
  constructor(message: string = "Unauthorized") {
    super(message)
  }
}

export class FailedLoadImages extends Error {
  constructor(message: string = "Failed to load images") {
    super(message)
  }
}
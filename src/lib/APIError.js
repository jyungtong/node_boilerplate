module.exports = class APIError {
  constructor (message, status = 500) {
    this.message = message
    this.status = status
  }
}

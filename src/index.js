import moment from 'moment'

class Session {
  constructor(session) {
    this.session = session || {}
    this.isValid = Boolean(this.session.id)
    this.isRoot = this.session.isRoot
    this.permissions = this.session.permissions || []
    this.hasExpired = moment.utc().isAfter(this.session.expiry)

    this.hasHotelflex = this.hasHotelflex.bind(this)
    this.hasHotelier = this.hasHotelier.bind(this)
  }
  hasHotelflex(role) {
    return this.permissions
      .filter(p => p.type === 'HOTELFLEX')
      .filter(p => p.role === role)
      .length > 0
  }
  hasHotelier(role, hotelId) {
    return this.permissions
      .filter(p => p.type === 'HOTELIER')
      .filter(p => p.entityId === hotelId)
      .filter(p => p.role === role)
      .length > 0
  }
}

module.exports = Session
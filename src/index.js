const moment = require('moment')

function Session(session) {
  this.session = session || {}
  this.isValid = Boolean(this.session.id)
  this.isRoot = Boolean(this.session.isRoot)
  this.permissions = this.session.permissions || []
  this.hasExpired = moment.utc().isAfter(this.session.expiry)

  this.hasHotelflex = hasHotelflex.bind(this)
  this.hasHotelier = hasHotelier.bind(this)

  function hasHotelflex(role) {
    return this.permissions
      .filter(function(p) {
        return p.type === 'HOTELFLEX'
          && p.role === role
      }).length > 0
  }

  function hasHotelier(role, hotelId) {
    return this.permissions
      .filter(function(p) {
        return p.type === 'HOTELIER'
          && p.entityId === hotelId
          && p.role === role
      }).length > 0
  }
}

module.exports = Session
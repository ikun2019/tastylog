module.exports = {
  PORT: process.env.PORT || 3000,
  security: {
    SESSION_SECRET: 'Your-session-secret-string'
  },
  search: {
    MAX_ITEMS: 5
  }
}
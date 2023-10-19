import { connect as connectDatabase } from './database/dbConnection'
import { initServer } from './server/httpServer'

connectDatabase()
  .then(() => {
    initServer()
  }).catch(error => {
    console.info('Error launching application', error)
    process.exit(1)
  })

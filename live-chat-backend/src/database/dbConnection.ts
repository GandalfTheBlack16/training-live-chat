import mongoose from 'mongoose'

const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017'
const username = process.env.MONGO_USER ?? 'root'
const password = process.env.MONGO_PWD ?? 'example'

const connect = async (): Promise<void> => {
  await mongoose.connect(uri, {
    dbName: 'live-chat',
    auth: { username, password }
  })
}

export { connect }

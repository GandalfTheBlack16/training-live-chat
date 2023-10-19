import mongoose from 'mongoose'

const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/live-chat'

const connect = async (): Promise<void> => {
  await mongoose.connect(uri, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
  })
}

export { connect }

import mongoose from 'mongoose'

const connectDB = (url: string) => {
  mongoose.set('strictQuery', true)
  mongoose.connect(url)
    .then(() => console.log('mongoDB connected'))
    .catch((err) => {
      console.error('failed to connect with mongo')
      console.error(err)
    })
}

export default connectDB
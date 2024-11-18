import app from './app/app'
const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}


app.listen(process.env.URL, () => {
    console.log(`Example app listening on port ${process.env.URL}`)
  })
import app from './app/app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.Port, () => {
      console.log(`Example app is listening on port ${config.Port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

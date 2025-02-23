import * as mongoose from 'mongoose';
import * as process from 'process';

import { config } from '@api/config';

export async function databaseInit() {
  try {
    const conn = await mongoose.connect(config.databaseUrl, {
      autoIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err: unknown) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
}

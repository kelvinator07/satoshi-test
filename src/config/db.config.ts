import dotenv from "dotenv";
dotenv.config();

export const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  pool: {
    max: Number(process.env.DB_POOL_MAX),
    min: Number(process.env.DB_POOL_MIN),
    acquire: Number(process.env.DB_POOL_ACQUIRE),
    idle: Number(process.env.DB_POOL_IDLE),
  },
};

export const dialect = "postgres";

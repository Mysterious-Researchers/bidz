import axios from "axios";
import * as process from "process";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export { client, delay };

import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

export type BaseError = AxiosError<{
  message: string;
}>;

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = (error as BaseError).response?.data.message;
    toast.error(errorMessage ?? "Something went wrong");
    throw error;
  },
);

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export { client, delay };

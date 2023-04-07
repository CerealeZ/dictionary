import axios from "axios"

interface Fetcher {
  get: <T>() => Promise<Data<T>>
}

export default function Fetcher(url: string): Fetcher {
  const get = async <T>(): Promise<Data<T>> => {
    try {
      const { data, status } = await axios.get<T>(url)
      return {
        isOkay: true,
        status,
        data,
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return {
          isOkay: false,
          status: 400,
        }
      }
      return {
        error: error.message,
        status: error.status || 400,
        isOkay: false,
      }
    }
  }

  return {
    get,
  }
}

interface Data<T> {
  error?: string
  data?: T
  status: number
  isOkay: boolean
}

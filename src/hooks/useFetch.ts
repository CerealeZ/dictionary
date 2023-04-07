import { useEffect, useState } from "react"
import axios from "axios"

interface Data<T> {
  error?: string
  data?: T
  status: number
  isOkay: boolean
}

export default function useFetch<T>(url: string): [Data<T> | null, boolean] {
  const [data, setData] = useState<Data<T> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const { data, status } = await axios.get<T>(url)
        setData({
          data,
          status,
          isOkay: true,
        })
      } catch (error) {
        if (!axios.isAxiosError(error)) return
        setData({
          error: error.message,
          status: error.status || 500,
          isOkay: false,
        })
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [url])
  return [data, isLoading]
}

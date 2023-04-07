import { useReducer, useEffect } from "react"

const useLocalStorage = <T>(
  key: string,
  initialState: T
): [T | null, React.Dispatch<Actions<T>>] => {
  const [localStorage, dispatch] = useReducer<
    React.Reducer<T | null, Actions<T>>
  >(localStorageReducer, null)

  useEffect(function getLocalStorage() {
    dispatch({
      type: "GET",
      payload: {
        defaultValue: initialState,
        key,
      },
    })
  }, [])

  return [localStorage, dispatch]
}

interface SetLocal<T> {
  type: "SET"
  payload: {
    key: string
    body: T
  }
}

interface GetLocal<T> {
  type: "GET"
  payload: {
    key: string
    defaultValue: T
  }
}

interface DeleteLocal {
  type: "DELETE"
  payload: string
}

type Actions<T> = SetLocal<T> | DeleteLocal | GetLocal<T>

const localStorageReducer = <T>(state: T, actions: Actions<T>): T | null => {
  switch (actions.type) {
    case "SET": {
      const { body, key } = actions.payload
      window.localStorage.setItem(key, JSON.stringify(body))
      return body
    }
    case "DELETE": {
      window.localStorage.removeItem(actions.payload)
      return null
    }
    case "GET": {
      const { defaultValue, key } = actions.payload
      const localStorage = window.localStorage.getItem(key)
      try {
        const parsedStorage: T = localStorage
          ? JSON.parse(localStorage)
          : defaultValue
        return parsedStorage
      } catch {
        return defaultValue
      }
    }
    default: {
      return state
    }
  }
}

export default useLocalStorage

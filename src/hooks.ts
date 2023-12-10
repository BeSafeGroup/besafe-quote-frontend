import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSocket = () => {

  const [socketClient] = useState<Client>(new Client({
    brokerURL: 'ws://localhost:8083/API/public-ws',
    onConnect: () => {
      console.log('[Pub-Socket] - connected')
    }
  }))

  useEffect(() => {
    socketClient.activate()
    return () => {
      if (socketClient.connected) {
        console.log('[Pub-Socket] - disconnected')
        socketClient.deactivate()
      }
    }
  }, [ socketClient ])

  return socketClient

}
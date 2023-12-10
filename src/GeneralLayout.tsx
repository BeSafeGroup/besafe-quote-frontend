import { useSocket } from "./hooks"

export default function GeneralLayout ({ children } : { children: any }) {

  useSocket()

  return (
    <div>
      {children}
    </div>
  )

}
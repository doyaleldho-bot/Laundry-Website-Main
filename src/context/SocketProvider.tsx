import { useEffect } from "react"
import socket from "../services/soket"
import SocketContext from "./SocketContext"
import { useAppSelector } from "../redux/hooks"

export default function SocketProvider({ children }: any) {
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (!user?.id) return

    console.log("Socket connecting...")

    if (!socket.connected) {
      socket.connect()
    }

    // join personal room
    socket.emit("join", { userId: user?.id ,role: user?.role})

    // cleanup only on logout / app destroy
    return () => {
      socket.disconnect()
      console.log("Socket disconnected")
    }
  }, [user?.id])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
 
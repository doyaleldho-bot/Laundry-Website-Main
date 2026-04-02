import { useEffect } from "react"
import toast from "react-hot-toast"

import { addNotificationRealtime } from "../redux/reducer/notificationSlice"
import {
  deliverNotifications,
  fetchNotifications,
} from "../redux/action/notificationThunks"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useSocket } from "../context/SocketContext"
 
export default function AppLayout({ children }: any) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const socket = useSocket()

  useEffect(() => {
    if (!user?.id) return

    // fetch notifications
    dispatch(fetchNotifications())
    dispatch(deliverNotifications())

    const handleNewNotification = (data: any) => {
      dispatch(addNotificationRealtime(data))
      toast.success(data.message)
    }

    const handleEmailStatus = (data: any) => {
      if (data.status === "SUCCESS") {
        toast.success(`Email sent to ${data.email}`)
      } else {
        toast.error(`Email failed for ${data.email}`)
      }
    }

    socket.on("new-notification", handleNewNotification)
    socket.on("email-status", handleEmailStatus)

    return () => {
      socket.off("new-notification", handleNewNotification)
      socket.off("email-status", handleEmailStatus)
    }
  }, [user?.id, socket])

  return children
}

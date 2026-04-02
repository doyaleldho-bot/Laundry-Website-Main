export interface Notification {
  id: string
  title: string
  message: string
  createdAt: string
  isRead?: boolean
  isDelivered?: boolean
}

export interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  error: string | null
}

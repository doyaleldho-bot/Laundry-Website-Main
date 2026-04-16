import { BrowserRouter } from "react-router-dom"
import AppRoutes from "../src/routes/routes"
import { AuthProvider } from "./context/AuthContext"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { getProfile } from "./redux/action/authThunks"
import SocketProvider from "./context/SocketProvider"
import AppLayout from "./layout/AppLayout"
// import api from "./utils/api"
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_LIBS: ("places")[] = ["places"];

const App = () => {
  const { authChecked } = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
  
    if (!authChecked) {
      dispatch(getProfile())
    }
    
  }, [dispatch,authChecked])

  return (
       <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
      libraries={GOOGLE_LIBS}
    >
    <AuthProvider>
      <SocketProvider>
        <AppLayout>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppLayout>
      </SocketProvider>
    </AuthProvider>
    </LoadScript>
  )
}

export default App

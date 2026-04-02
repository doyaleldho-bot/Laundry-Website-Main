import axios from "axios"
import { serviceItemsData } from "../../utils/itemDatas"

export const getServiceItems = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5001/api/service/service-items"
    )
    return res.data
  } catch (error) {
    console.warn("Backend fetch failed, using mock data:", (error as Error).message)
    return serviceItemsData
  }
}

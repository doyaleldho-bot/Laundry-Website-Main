interface PricingItem {
  id: string
  costume: string
  washAndFold: string | null
  washAndIroning: string | null
  steamPress: string | null
  dryClean: string | null
  stitchingNote: string | null
}
import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../utils/api"

const PricingTable = () => {
  // const [items, setItems] = useState<PricingItem[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [items, setItems] = useState<any[]>([])
  const [visibleRows, setVisibleRows] = useState(15)

  // FETCH FROM BACKEND
  useEffect(() => {
    const fetchItems = async () => {
      const res = await api.get("/service/service-items")
      console.log(res)
      // setItems(res.data)
    }

    fetchItems()
  }, [])

  useEffect(() => {
    const fetchItems = async () => {
      const res = await api.get("/super_admin/service/service-item/rate")

      setHeaders(res.data.data.headers)
      setItems(res.data.data.rows)
    }

    fetchItems()
  }, [])

  // INFINITE SCROLL (UNCHANGED)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setVisibleRows((prev) => Math.min(prev + 5, items.length))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  // const headers = [
  //   { label: "Costume", width: "w-[250px]" },
  //   { label: "Wash & Fold", width: "w-[186px]" },
  //   { label: "Wash & Ironing", width: "w-[186px]" },
  //   { label: "Steam Press", width: "w-[186px]" },
  //   { label: "Dry Clean", width: "w-[186px]" },
  //   { label: "Stitching", width: "w-[186px]" },
  // ]

  return (
    <div className="max-w-[1500px] rounded-xl px-12 mb-2">
      {/* scroll container */}
      <div className="h-[700px] overflow-auto  rounded-xl custom-scrollbar-table pr-2  pb-4">
        <table className="w-full table-fixed border-collapse text-center">
          {/* HEADER */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#639EFF] text-white h-[155px]">
              {headers.map((head) => (
                <th
                  key={head}
                  className="border border-white px-4 font-medium text-[20px] w-[180px]"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {items.slice(0, visibleRows).map((row, index) => (
              <tr
                key={index}
                className="text-[#5D5C5C] text-[18px] hover:bg-blue-50 transition"
              >
                {headers.map((head) => (
                  <td
                    key={head}
                    className="border border-gray-300 px-4 py-6 w-[180px] truncate"
                  >
                    {row[head] ?? "NA"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PricingTable

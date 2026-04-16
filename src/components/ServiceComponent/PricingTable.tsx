import { useEffect, useState } from "react"
import axios from "axios"

const PricingTable = () => {
  const [headers, setHeaders] = useState<string[]>([])
  const [items, setItems] = useState<any[]>([])
  const [visibleRows, setVisibleRows] = useState(10)

  // FETCH DATA
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/super_admin/service/service-item/rate",
          { withCredentials: true },
        )

        setHeaders(res.data.data.headers)
        setItems(res.data.data.rows)
      } catch (err) {
        console.error(err)
      }
    }

    fetchItems()
  }, [])

  // LOAD MORE BUTTON
  const handleLoadMore = () => {
    setVisibleRows((prev) => Math.min(prev + 10, items.length))
  }

  return (
    <div className="max-w-[1500px]  mx-auto  mt-8 rounded-xl px-6  font-[Reddit-Sans]">
      {/* TABLE CONTAINER */}
      <div className="overflow-auto rounded-xl  shadow-sm">
        <table className="w-full table-fixed border-collapse text-center">
          {/* HEADER */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
              {headers.map((head) => (
                <th
                  key={head}
                  className="px-4 py-4 font-semibold text-[18px] border border-white"
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
                className="text-gray-600 text-[16px] hover:bg-blue-50 transition"
              >
                {headers.map((head) => (
                  <td
                    key={head}
                    className="border border-gray-200 px-4 py-3 truncate"
                    title={row[head]}
                  >
                    {row[head] ?? "NA"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleRows < items.length && (
        <div className="flex justify-center mt-6 pb-5">
          <button
            onClick={handleLoadMore}
            className=" text-blue-600   hover:underline"
          >
            View More
          </button>
        </div>
      )}
    </div>
  )
}

export default PricingTable
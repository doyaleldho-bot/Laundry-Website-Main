import React, { useEffect, useRef, useState } from "react"

// Custom hook to animate count-up
function useCount(end: number, duration = 1500, start = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.floor(progress * end)
      setValue(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(end)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration, start])

  return value
}

// Format numbers, add "k+" for thousands
const formatValue = (val: number, end: number) => {
  if (end >= 1000) {
    if (val >= 1000) {
      const k = Math.floor(val / 1000)
      return `${k}k+`
    }
    return `${val}+`
  }
  return `${val}+`
}

// Reusable counter component
const Counter = ({
  value,
  end,
  label,
}: {
  value: number
  end: number
  label: string
}) => (
  <div className="flex-1 flex flex-col items-center">
    <span
      className=" mt-8 min-[540px]:mt-25 sm:mt-8 md:mt-8 lg:mt-1
    font-['Reddit_Sans'] font-medium text-[#0D3476]
    text-[24px] leading-[28px]
    sm:text-[28px] sm:leading-[32px]
    md:text-[36px] md:leading-[40px]
    lg:text-[48px] lg:leading-[48px]
  "
    >
      {formatValue(value, end)}
    </span>
    <span className="text-gray-600 text-[12px] md:text-[14px] lg:text-[18px]">
      {label}
    </span>
  </div>
)

const ClientNumber: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasAnimated = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const val1 = useCount(30, 1200, visible)
  const val2 = useCount(5000, 1500, visible)
  const val3 = useCount(10000, 1600, visible)

  return (
    <div className="flex justify-center font-['Reddit_Sans'] font-medium">
      <div
        ref={containerRef}
        className="
      flex flex-nowrap items-center justify-between
      px-4 py-3
      gap-6 sm:gap-10 md:gap-16 lg:gap-24
      w-full md:w-[460px] lg:w-[613px]
    "
      >
        <Counter label="Cities" value={val1} end={30} />
        <Counter label="Customers" value={val2} end={5000} />
        <Counter label="Orders" value={val3} end={10000} />
      </div>
    </div>
  )
}

export default ClientNumber

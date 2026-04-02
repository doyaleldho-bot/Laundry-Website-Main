import WhatsappIcon from "../../assets/icons/whatsapp.svg";
import PhoneIcon from "../../assets/icons/phone.svg";

export default function FloatingContactButtons() {
  return (
<div
  className="
    absolute
    -right-10
    top-1/3
    z-30
    flex flex-col
    gap-6
    overflow-hidden
  "
>

      {/* WhatsApp */}
      <div className="relative w-62.5 h-12 group hover:cursor-pointer hover:w-54 hover:bg-white/15 rounded-2xl transition-all duration-300 ease-out">
        {/* Icon */}
        <a
           href="https://wa.me/917306353515?text=Hello%20I%20need%20help"
           target="_blank"
           rel="noopener noreferrer"
          aria-label="WhatsApp us"
          className="
            absolute right-16
            w-12 h-12
            flex items-center justify-center
            rounded-full
            bg-white/10
            hover:bg-white/20
            transition-transform duration-300 ease-out
            group-hover:-translate-x-26
          "
        >
          <img src={WhatsappIcon} alt="WhatsApp" className="w-6 h-6" />
        </a>

        {/* Label (RIGHT SIDE) */}
        <span
          className="
            absolute
            right-0
            top-1/2 -translate-y-1/2
            px-4 py-2
            text-sm font-medium text-white
            opacity-0 -translate-x-2
            group-hover:opacity-100 group-hover:-translate-x-15
            transition-all duration-300 ease-out
            whitespace-nowrap
            pointer-events-none
          "
        >
          WhatsApp Us
        </span>
      </div>

      {/* Phone */}
      <div className="relative w-62.5 h-12 group  hover:cursor-pointer hover:bg-white/15 rounded-2xl transition-all duration-300 ease-out">
        {/* Icon */}
        <a
          href="tel:+91xxxxxxxxxxx"
          aria-label="Call"
          className="
            absolute right-16
            w-12 h-12
            flex items-center justify-center
            rounded-full
            bg-white/10
            hover:bg-white/20
            transition-transform duration-300 ease-out
            group-hover:-translate-x-34
          "
        >
          <img src={PhoneIcon} alt="Phone" className="w-6 h-6" />
        </a>

        {/* Label (RIGHT SIDE) */}
        <span
          className="
            absolute
            right-0
            top-1/2 -translate-y-1/2
            px-4 py-2
            text-sm font-medium text-white
            opacity-0 -translate-x-2
            group-hover:opacity-100 group-hover:-translate-x-34
            transition-all duration-300 ease-out
            whitespace-nowrap
            pointer-events-none
          "
        >
          Call Us
        </span>
      </div>
    </div>


  );
}

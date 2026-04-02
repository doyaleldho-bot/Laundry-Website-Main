import { useState } from 'react'

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'How does Slams Wash work?',
            answer: 'It’s very simple! Just place an order through our website or app, choose a pickup time, and our team will collect your laundry from your doorstep. We wash, dry, and iron your clothes with care and deliver them back to you fresh and neatly packed.'
        },
        {
            question: 'What services do you offer?',
            answer: 'We offer washing, drying, ironing, and dry-cleaning services. We also handle delicate fabrics, ethnic wear, office wear, and household items like bedsheets, curtains, and blankets.'
        },
        {
            question: 'Do you provide pickup and delivery?',
            answer: 'Yes, absolutely! We offer convenient doorstep pickup and delivery to make your laundry experience completely hassle-free. Simply schedule a pickup, and our team will collect your clothes from your location, clean them with care, and deliver them back to your doorstep on time. '
        },
        {
            question: 'What detergents do you use?',
            answer: 'We use high-quality, fabric-safe detergents that are gentle on clothes while ensuring thorough cleaning.'
        },
        {
            question: 'Are my clothes washed separately?',
            answer: 'Yes, your clothes are washed separately to ensure they receive personalized care and attention.'
        },
        {
            question: 'What detergents do you use?',
            answer: 'We use high-quality, fabric-friendly detergents that are gentle on clothes and safe for all skin types. Our detergents are carefully selected to provide effective cleaning while preserving fabric softness and color. Wherever possible, we also use eco-friendly options, ensuring your clothes are cared for responsibly and sustainably.'
        },
        {
            question: 'How do you handle stains and delicate clothes?',
            answer: 'We handle stains and delicate clothes with extra care and attention. Stains are treated individually using fabric-safe and effective methods, based on the type of stain and material. Delicate and premium garments are cleaned using special care techniques and gentle wash cycles to prevent damage, maintain texture, and ensure your clothes remain in excellent condition.'
        },
        {
            question: 'What if I have special instructions for my clothes?',
            answer: 'No problem at all! You can easily add special instructions while booking your order, such as washing preferences or handling specific garments. Our team carefully reviews and follows these instructions to ensure your clothes are cleaned exactly the way you want, with the attention and care they deserve.'
        }
    ]

    return (
         <section className="w-full py-10 md:py-14 lg:py-16 justify-center">
         <h2 className=" text-center font-['Reddit_Sans'] font-semibold text-[22px]  sm:text-[26px] md:text-[30px] lg:text-[36px]  leading-[100%] tracking-normal text-[#448AFF] ">
                  FAQ’s
                </h2>
       <div className="w-full bg-[linear-gradient(180deg,#295399_0%,#448AFF_100%)] flex justify-center items-start py-12 mt-10">
            {/* Imported Fonts: Essential for font-['Poppins'] to work */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Reddit+Sans:wght@400;600&display=swap');
            `}</style>

            <div className="max-w-[1440px] w-full px-4">
                
                <div className="flex flex-col gap-0 max-w-[1062px] mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="w-full bg-white mb-4 rounded-lg overflow-hidden shadow-sm">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full min-h-[66px] bg-white px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <span className="font-['Poppins',_sans-serif] font-medium text-[#1f2937] text-left flex-1 text-[14px] sm:text-[15px] md:text-[16px]">
                                    {faq.question}
                                </span>
                                <span className="w-9 h-9
                                        grid 
                                        border border-[#1f2937]
                                        rounded-full
                                        text-[20px]
                                        font-bold
                                        text-[#1f2937]
                                        flex-shrink-0">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>

                            {openIndex === index && (
                                <>
                                    <div className="h-[1px] bg-gray-200"></div>
                                    <div className="w-full bg-white px-6 py-5">
                                        <p className="font-['Reddit_Sans',_sans-serif] font-normal text-[#4b5563] leading-relaxed text-[14px] sm:text-[16px] md:text-[18px]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
     </section>
    )
}

export default Faq
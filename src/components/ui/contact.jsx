export function Contact() {
  return (
    <div className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
      <div className="para uppercase text-center leading-none z-40">
        <p
          style={{
            WebkitTextStroke: "1px rgb(207, 205, 205)",
            WebkitTextFillColor: "transparent",
          }}
          className="z-10 font-bold text-3xl -mb-5 tracking-wider text-gray-900"
        >
          EcoLife
        </p>
        <p className="font-bold text-3xl tracking-wider text-[#000] z-30">
          EcoLife
        </p>
      </div>
      <div className="w-[180px] aspect-square relative z-20 flex items-center justify-center duration-300 hover:scale-105 group">
        <svg
          className="w-[80px] h-[90px] fill-[#171717] mb-2"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"></path>
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#7b956a]"></div>
        <div className="tooltips absolute top-full left-0 p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full"></div>
      </div>
    </div>
  );
}

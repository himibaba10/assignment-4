import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const HomeBanner = () => {
  const slides = [
    {
      bgImg:
        "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Browse All Books",
    },
    {
      bgImg:
        "https://images.unsplash.com/photo-1521056787327-165dc2a32836?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Browse All Books",
    },
    {
      bgImg:
        "https://images.unsplash.com/photo-1523865236457-3ae3358a4eaa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Browse All Books",
    },
  ];

  return (
    <>
      <Swiper
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                backgroundImage: `url(${slide.bgImg})`,
              }}
              className="relative py-32 md:py-56 bg-cover text-center bg-center"
            >
              <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-full w-full z-0"></div>
              <span className="text-3xl md:text-5xl text-white relative z-10">
                {slide.title}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeBanner;

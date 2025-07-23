import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const SliderComponent = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-red-500">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-blue-500">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-green-500">Slide 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-yellow-500">Slide 4</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-purple-500">Slide 5</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-pink-500">Slide 6</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-indigo-500">Slide 7</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-gray-500">Slide 8</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[300px] h-[200px] bg-teal-500">Slide 9</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderComponent;

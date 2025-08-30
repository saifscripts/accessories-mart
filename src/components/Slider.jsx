import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import heroImages from '../../public/heroImages.json'; // Import the JSON file

const Slider = () => {
  return (
    <div className="relative w-full">
      {/* Container with fixed aspect ratio to prevent layout shift */}
      <div className="relative w-full" style={{ aspectRatio: '8/3' }}>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="w-full h-full"
        >
          {heroImages.images.map((img, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div className="relative w-full h-full bg-gradient-to-r from-gray-200 to-gray-300">
                <img
                  className="w-full h-full object-cover transition-opacity duration-300"
                  src={img}
                  alt={`slide-${index}`}
                  loading="eager"
                  onLoad={(e) => {
                    // Ensure image maintains aspect ratio and fade in smoothly
                    e.target.style.objectFit = 'cover';
                    e.target.style.opacity = '1';
                  }}
                  onError={(e) => {
                    // Fallback for failed image loads
                    e.target.style.display = 'none';
                  }}
                  style={{ opacity: 0 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;

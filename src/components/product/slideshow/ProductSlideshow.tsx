"use client";

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperObject } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './slideshow.css'
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            width: 'auto', height: 'auto'
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 2500 }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.length > 0 ?
            (
              images.map(image => (
                <SwiperSlide key={image}>
                  <Image
                    placeholder='blur'
                    blurDataURL={`/products/${image}`}
                    src={`/products/${image}`}
                    alt={title}
                    width={1024} height={800}
                    className='rounded object-contain'
                  />
                </SwiperSlide>
              ))
            ) :
            (
              <ProductImage alt={''} width={1024} height={1024} />
            )
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.length > 0 ?
            (
              images.map(image => (
                <SwiperSlide key={image}>
                  <Image
                    placeholder='blur'
                    blurDataURL={`/products/${image}`}
                    src={`/products/${image}`}
                    alt={title}
                    width={300} height={300}
                    className='rounded object-contain'
                  />
                </SwiperSlide>
              ))
            ) :
            (
              <ProductImage alt={''} width={300} height={300} />
            )
        }
      </Swiper>
    </div>
  )
}
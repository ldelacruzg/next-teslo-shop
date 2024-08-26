"use client";

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import './slideshow.css'
import { ProductImage } from '@/components';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      <Swiper
        style={{ width: 'auto', height: 'auto' }}
        pagination
        autoplay={{ delay: 3000 }}
        modules={[FreeMode, Pagination, Autoplay]}
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
    </div>
  )
}
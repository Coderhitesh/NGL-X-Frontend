import React, { useRef, useState } from 'react'
import './OurClient.css'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import s1 from './l1.webp'
import s2 from './l2.png'
import s3 from './l3.png'
import s4 from './l4.svg'
import s5 from './l5.png'
import s6 from './l6.png'
import s7 from './l7.png'
import s8 from './l8.jpg'
import s9 from './l9.jpg'
import s10 from './l10.jpg'
import s11 from './l11.jpg'
import s12 from './l12.jpg'


function OurClient() {
    return (
        <section className='client-section'>
            <div className="container">
                {/* <div className="heading">
                    <span><i class="ri-arrow-right-double-fill"></i>OUR CLIENTS<i class="ri-arrow-left-double-line"></i></span>
                </div> */}
                <div className="client-box">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Autoplay]}
                        className="mySwiper-clients"
                    >
                        {/* <SwiperSlide >
                            <img src={s7} alt="client" />
                        </SwiperSlide> */}
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} className='img border-black border' alt="client" />
                        </SwiperSlide>
                        {/* <SwiperSlide className='img'>
                            <img src={s7} alt="clinet" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} alt="client" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} alt="clinet" />
                        </SwiperSlide>
                        <SwiperSlide className='img'>
                            <img src={s7} alt="client" />
                        </SwiperSlide> */}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default OurClient

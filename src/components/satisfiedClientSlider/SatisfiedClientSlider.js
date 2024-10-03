"use client"; // This is a client component 👈🏽
import React from 'react'
import styles from "./SatisfiedClientSlider.module.css"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Pankaj from "../../../public/pankaj.jpg"
import Siraj from "../../../public/siraj.jpg"
import Chaitanya from "../../../public/chaitanya.png"
import Sebastian from "../../../public/sebastian.png"
import Christina from "../../../public/christina.png"
import Bhavuk from "../../../public/bhavuk.png"
const SatisfiedClientSlider = ({ clients }) => {


    return (
        <div>
            <Carousel showThumbs={false} animationHandler='fade' swipeable={false} infiniteLoop autoPlay>
                {clients.map((client) => (
                    <div key={client.name}>
                        <div className='clintsliderrow md:flex justify-between'>

                            <div className='clintDetails w-3/4 pr-4'>
                                <p>{client.desc}</p>
                                <div className='clinename'>{client.name}</div>
                                <div className='clinedesg'>{client.desg}</div>
                            </div>
                            <div className='clintImage w-1/4 pl-4 pr-4'>
                                <div className='qouts'>
                                    <img className='' src="/qouts.png" alt="qouts" />
                                </div>

                                <img
                                    src={client.image}
                                    alt='imageSrc'
                                    className={styles.objectContain}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default SatisfiedClientSlider
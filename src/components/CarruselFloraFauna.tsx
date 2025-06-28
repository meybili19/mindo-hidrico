'use client';
import Slider from 'react-slick';
import Image from 'next/image';

interface Item {
  nombre: string;
  src: string;
}

export default function Carrusel({ items }: { items: Item[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index} className="slide-content">
          <Image
            src={item.src}
            alt={item.nombre}
            width={250}
            height={170}
            style={{ borderRadius: '8px', objectFit: 'cover' }}
          />
          <p style={{ marginTop: '0.5rem', fontWeight: 'bold', textAlign: 'center' }}>
            {item.nombre}
          </p>
        </div>
      ))}
    </Slider>
  );
}

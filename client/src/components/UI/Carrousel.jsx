import React from "react";
import { Carousel } from "react-bootstrap";
import Img1 from "../../assets/carousel/Img1.jpg";
import Img2 from "../../assets/carousel/Img2.jpg";
import Img3 from "../../assets/carousel/Img3.jpg";

export default function Carrousel() {
  return (
    <Carousel>
      <Carousel.Item className="h-[70vh]">
        <img
          className="h-full w-full object-fill"
          src={Img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="text-xl ">Consigue los mejores boletos</h3>
          <p className="text-xl">a los mejores precios!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="h-[70vh]">
        <img
          className="relative h-full w-full object-fill"
          src={Img2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="text-xl ">
            Compra tus entradas para los mejores conciertos
          </h3>
          <p className="text-xl">
            , eventos deportivos, obras de teatros, festivales y mucho más.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="h-[70vh]">
        <img
          className="relative h-full w-full object-fill"
          src={Img3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className="text-xl  ">Preparate con todo para el mundial</h3>
          <p className="text-xl">
            Los mejores partidos en vivo, adquiera su entrada!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

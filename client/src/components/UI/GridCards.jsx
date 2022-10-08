import React from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Img1 from "../../assets/carousel/Img1.jpg";
import Img2 from "../../assets/carousel/Img2.jpg";
import Img3 from "../../assets/carousel/Img3.jpg";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function GridCards({ eventos }) {
  const eventStock = eventos.filter((e) => e.stock < 400);
  const image = eventStock.map((m) => m.image);
  const id = eventStock.map((i) => i.id);

  const features = [
    {
      name: "Más Vendido",
      description: "Eventos mas adquirido por el publico!",
      id: id[0],
      image: image[0],
      icon: StarIcon,
    },
    {
      name: "Últimos boletos",
      description: "Ultimas entradas para tus eventos favoritos",
      id: id[1],
      image: image[1],
      icon: LockClosedIcon,
    },
    {
      name: "Recomendación",
      description: "Lo mas recomendado",
      id: id[2],
      image: image[2],
      icon: CloudArrowUpIcon,
    },
  ];

  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-indigo-600">Boletos</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Encuentra los mejores eventos
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Phasellus lorem quam molestie id quisque diam aenean nulla in.
          Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
          condimentum id viverra nulla.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {feature.description}
                    </p>
                    <Link to={`/private/events/${feature.id}`}>
                      <img src={feature.image} alt="" className="mt-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridCards;

{
  /* <Carousel>
                      <Carousel.Item className="h-48">
                        <Link to={`/private/events/${feature.id}`}>
                          <img
                            className="mx-auto rounded-md mt-4 h-full w-full"
                            src={feature.image}
                            alt=""
                            href={`/events/${feature.id}`}
                          />
                        </Link>
                      </Carousel.Item>
                      <Carousel.Item className="h-48">
                      <Link to={`/private/events/${feature.id}`}>
                          <img
                            className="mx-auto rounded-md mt-4 h-full w-full"
                            src={feature.image}
                            alt=""
                            href={`/events/${feature.id}`}
                          />
                        </Link>
                      </Carousel.Item>
                      <Carousel.Item className="h-48">
                      <Link to={`/private/events/${feature.id}`}>
                          <img
                            className="mx-auto rounded-md mt-4 h-full w-full"
                            src={feature.image}
                            alt=""
                            href={`/events/${feature.id}`}
                          />
                        </Link>
                      </Carousel.Item>
                    </Carousel> */
}

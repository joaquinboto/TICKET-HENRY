import React from "react";

function CallToAction() {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
        <span className="block">Consigue los mejores boletos,</span>
        <span className="block">a los mejores precios!</span>
      </h2>
      <p className="mt-4 text-lg leading-6 text-black-200">
        Compra tus entradas para los mejores conciertos, eventos deportivos,
        obras de teatros, festivales y mucho más.
      </p>
      <a
        href="/events"
        className="shadow-sm mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 sm:w-auto"
      >
        Explorar Eventos
      </a>
    </div>
  );
}

export default CallToAction;

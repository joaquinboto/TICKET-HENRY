import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { XCircleIcon } from '@heroicons/react/20/solid'
import { createEvent } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../logo/logo.png";
import data from "../utils/place.json";

function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [error, setError] = useState({});
  const [valor, setValor] = useState(true)
  const [artistas, setArtistas] = useState({});
  const [input, setInput] = useState({
    description: "",
    price: 0,
    date: "",
    artist: [],
    place: "",
    stock: 0,
    category: [],
    image: "",
    imageId: "",
    userId: user.id,
  });

  function validation(input) {
    let errors = {};
    if (input.description.length < 20) {
      errors.description = "Minium 20 characters";
    }
    if (input.description.length > 255) {
      errors.description = "Max 255 characters";
    }
    if (!Date.parse(input.date)) {
      errors.date = "Date of release is required";
    }
    if (!input.artist.length) {
      errors.artist = "Artist is required";
    }
    if (!input.price) {
      errors.price = "Price is required";
    }
    if (!input.stock) {
      errors.stock = "Stock is required";
    }
    if (!input.place) {
      errors.place = "Place is required";
    }

    if (!input.category.length) {
      errors.category = "Select at least a one or five genres ";
    }
    if (!/^[0-9]+$/.test(input.price)) {
      errors.price = "Only numbers accepted";
    }
    if (!/^[0-9]+$/.test(input.stock)) {
      errors.stock = "Only numbers accepted";
    }
    return errors;
  }

  async function handleFile(e) {
    e.preventDefault();
    let image = e.target.files[0];
    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pkokipva");
    fetch("https://api.cloudinary.com/v1_1/dzjonhhps/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setInput({
          ...input,
          image: res.secure_url,
          imageId: res.public_id,
        });
      });
  }

  const handleInputArtist = (e) => {
    const { value } = e.target;
    setArtistas(value);
  }

    const handleArtist = (e, artist) => {
      e.preventDefault()
      let nombre = artist;
      if (Object.values(input.artist).includes(nombre)) {
        alert("Artist already exists");
      } else {
        setInput({
          ...input,
          artist: [...input.artist, nombre],
        });
        setError(
          validation({
            ...input,
            artist: [...input.artist, nombre],
          })
        );
        setArtistas("");
      }
    };

    const handleDeleteArtist = (b, e) => {
      b.preventDefault()
      let newEvent = input.artist;
      const a = newEvent.filter((artist) => artist !== e);
      setInput({
        ...input,
        artist: a,
      });
    };

    function handleInputPrice(e) {
      setInput({
        ...input,
        price: Number(e.target.value),
      });
      setError(
        validation({
          ...input,
          price: [e.target.value],
        })
      );
    }

    function handleInputStock(e) {
      setInput({
        ...input,
        stock: Number(e.target.value),
      });
      setError(
        validation({
          ...input,
          stock: [e.target.value],
        })
      );
    }

    const handleSelectCategory = (e) => {
      setInput({
        ...input,
        category: [...new Set([...input.category, e.target.value])],
      });
      setError(
        validation({
          ...input,
          category: [...input.category, e.target.value],
        })
      );
    };

    const handleSelectPlace = (e) => {
      const { value } = e.target;
      setInput({
        ...input,
        place: value,
      });
      setError(
        validation({
          ...input,
          place: value,
        })
      );
    };

    function handleSubmit(e) {
      e.preventDefault();
      dispatch(createEvent(input));
      alert("Your event is created!")
      setError(validation(input));
      setInput({
        description: "",
        price: 0,
        date: "",
        artist: [],
        place: "",
        stock: 0,
        category: [],
        image: "",
        imageId: "",
        userId: "",
      });
      navigate("/events");
    }

    function handleInputChange(e) {

      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError(
        validation({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }

    const [disabledButton, setDisabledButton] = useState(true);



    useEffect(() => {

      if (
        input.artist.length === 0 ||
        !input.place ||
        !input.date ||
        !input.image ||
        input.description.length < 20 ||
        input.description.length > 255 ||
        input.description.length === 0 ||
        input.category.length === 0 ||
        !/^[0-9]+$/.test(input.stock) ||
        !/^[0-9]+$/.test(input.price)
      ) {
        return (setDisabledButton(true));
      } else {
        return (setDisabledButton(false));
      }
    }, [error, input, setDisabledButton, valor])


    return (
      <>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <a href="/">
              <img
                className="mx-auto h-24 w-auto"
                src={Logo}
                alt="Your Company"
              />
            </a>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your Event
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      onChange={(e) => handleInputChange(e)}
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Description..."
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {error.description ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.description && <p> {error.description}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Artist
                  </label>
                  <div className="mt-1 flex">
                    <input
                      onChange={(e) => handleInputArtist(e)}
                      id="artist"
                      name="artist"
                      type="text"
                      placeholder="Artist..."
                      autoComplete="current-Artist"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      onClick={(e) => handleArtist(e, artistas)}
                      // disabled={valor}
                      className="m-2"
                    >
                      <PlusCircleIcon className="h-5 w-5 text-green-800 text-right" />
                    </button>
                  </div>
                  {error.artist ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.artist && <p> {error.artist}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                  {input.artist &&
                    input.artist.map((artist, idx) => {
                      return (
                        <p key={idx}>
                          {artist}{" "}
                          <button onClick={(e) => handleDeleteArtist(e, artist)}>
                            X
                          </button>
                        </p>
                      );
                    })}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Place
                  </label>
                  <div className="mt-1">
                    <select
                      onChange={(e) => handleSelectPlace(e)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option hidden>Please select a place</option>
                      {data?.map((place, id) => {
                        return <option key={id}>{place.name_es}</option>;
                      })}
                    </select>
                  </div>
                  {error.place ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.place && <p> {error.place}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      onChange={(e) => handleSelectCategory(e)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option hidden>Please select a category</option>
                      <option value="Musica">Musica</option>
                      <option value="Desfile">Desfile</option>
                      <option value="Espectaculo">Espectaculo</option>
                      <option value="Convenciones">Convenciones</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Teatro">Teatro</option>
                    </select>
                  </div>
                  {error.category ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.category && <p> {error.category}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => handleInputPrice(e)}
                      id="price"
                      name="price"
                      type="text"
                      placeholder="$..."
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {error.price ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.price && <p> {error.price}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => handleInputStock(e)}
                      id="stock"
                      name="stock"
                      type="text"
                      placeholder="Stock..."
                      autoComplete="current-Stock"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {error.stock ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.stock && <p> {error.stock}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => handleInputChange(e)}
                      id="date"
                      type="date"
                      name="date"
                      autoComplete="current-Date"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {error.date ?
                    <div className=" mt-3 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <div className="mt-2 text-center text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                              {error.date && <p> {error.date}</p>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleFile}
                      type="file"
                      placeholder="The url of your image"
                      name="image"
                      accept="image/*"
                      autoComplete="off"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <img src={input.image} />
                  </div>
                </div>
                <button
                  disabled={disabledButton}
                  type="submit"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400"
                >
                  Create
                </button>
              </form>
              <div className="mt-4">
                <a
                  href="/"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-center"
                >
                  <input type="button" value="Go Back" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default CreateEvent;

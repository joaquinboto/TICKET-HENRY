import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEventDetail, updateEvent } from "../../store/actions";

function EventEdit({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    artist,
    category,
    currentStock,
    date,
    description,
    image,
    imageId,
    place,
    price,
    stock,
  } = useSelector((state) => state.eventsDetail);
  const [input, setInput] = useState({});

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

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(updateEvent(input, id));
    navigate("/admindashboard");
  }

  useEffect(() => {
    dispatch(getEventDetail(id));
  }, [dispatch, id]);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="pt-5">
        <div className="flex justify-end">
          <a
            href="/admindashboard"
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </a>
          <a
            href="/admindashboard"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </a>
        </div>
      </div>

      <div className="space-y-8 divide-y divide-gray-200 pt-4">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Event
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"></span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={description}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about the event.
              </p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => handleInputChange(e)}
                  defaultValue={price}
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => handleInputChange(e)}
                  defaultValue={stock}
                  type="number"
                  name="stock"
                  id="stock"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center justify-center">
                <span className="h-48 w-48 overflow-hidden rounded-md bg-gray-100 ">
                  <img src={image} alt="" className="h-full w-full " />
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <span className="ml-4 flex flex-shrink-0 items-center space-x-4">
                  <input
                    onChange={handleFile}
                    type="file"
                    accept="image/*"
                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  />
                  <span className="ml-4 flex-shrink-0"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <a
            href="/admindashboard"
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </a>
          <a
            href="/admindashboard"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </a>
        </div>
      </div>
    </form>
  );
}

export default EventEdit;

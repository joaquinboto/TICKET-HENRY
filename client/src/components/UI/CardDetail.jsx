import React, { useState } from "react";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  getEventDetail,
  addToCart,
  addToCartGuest,
  postReviewScore,
  getReviews,
  getComments,
  getCart,
} from "../../store/actions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Reviews from "./Reviews";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eventDetail = useSelector((state) => state.eventsDetail);
  const { user } = useSelector((state) => state);
  const [review, setReview] = useState({});

  useEffect(() => {
    dispatch(getEventDetail(id));
    dispatch(getReviews(id));
    dispatch(getComments(user.id));
    dispatch(getCart(user.id));
  }, [dispatch, id]);

  const handleCart = (id) => {
    if (user) {
      dispatch(addToCart(id, user.id));
    } else {
      dispatch(addToCartGuest(id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
              <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img
                  src={eventDetail.image}
                  alt={eventDetail.image}
                  className="object-cover object-center"
                />
              </div>
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                  {eventDetail.artist}
                </h2>

                <section aria-labelledby="information-heading" className="mt-2">
                  <p className="text-2xl text-gray-900">
                    Price: ${eventDetail.price}
                  </p>
                  <p className="text-2xl text-gray-900">
                    Description: {eventDetail.description}
                  </p>
                  <p className="text-2xl text-gray-900">
                    Event Date: {eventDetail.date}
                  </p>
                  <p className="text-2xl text-gray-900">
                    Tickets Stock: {eventDetail.stock}
                  </p>
                  <p className="text-2xl text-gray-900">
                    Venue: {eventDetail.place}
                  </p>
                </section>

                <section aria-labelledby="options-heading" className="mt-10">
                  <button
                    onClick={() => handleCart(id)}
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </section>
              </div>

              <div className="col-span-6 sm:col-span-full lg:col-span-6">
                <Reviews id={id} />
              </div>

              {eventDetail.comments &&
                eventDetail.comments.map((comment) => {
                  return (
                    <div
                      key={comment.id}
                      className="col-span-6 sm:col-span-full lg:col-span-6 bg-gray-100 px-4 py-4 rounded-md shadow-md"
                    >
                      <ul className=" flex-row">
                        <li className="my-2">Usuario: {comment.username}</li>
                        <li className="my-2">Review: {comment.description}</li>
                        <li className="my-2">Score: {comment.score}</li>
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CardDetail;

{
  /* Reviews */
  /* <div className="mt-6">
                <h4 className="sr-only">Reviews</h4>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {product.reviewCount} reviews
                  </a>
                </div>
              </div> */
}

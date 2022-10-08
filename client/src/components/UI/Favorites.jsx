import React, { useState } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {userAddFavorite , userGetFavorite , userDeleteFavorite} from '../../store/actions'


function Favorites({id}) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);
    const {allFavourites} = useSelector((state) => state)

    const existFavor = allFavourites.some(e => e === id)
    
    useEffect(()=> {
        user ? dispatch(userGetFavorite(user.id)) : null
    },[dispatch , existFavor])

    
    const addFavorite = (idEvent) => {
        dispatch(userAddFavorite(user.id, idEvent));
    }
    
    const deleteFav = (idEvent) => {
        dispatch(userDeleteFavorite(user.id, idEvent))
    }
    
  return (
    <>
    {existFavor ? (
        <button onClick={() => deleteFav(id) }>
            ❤️️
        </button>
    ): (
        <button onClick={() => addFavorite(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        </button>
    )}
    </>
  )
}

export default Favorites
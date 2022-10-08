import axios from "axios";

export const checkStates = () => (dispatch) => {
  return dispatch({
    type: "CHECK_STATUS",
  });
};

export const getEventDetail = (id) => async (dispatch) => {
  try {
    let eventsDB = await axios.get(`/eventsDB/${id}`);
    return dispatch({
      type: "GET_EVENT_DETAIL",
      payload: eventsDB.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  function concat(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray = newArray.concat(array[i]);
    }
    let uniqueCategories = [...new Set(newArray)];
    return uniqueCategories;
  }

  try {
    let getAllEvents = await axios.get("/events");
    let datos = getAllEvents.data;

    let categories = datos.map((el) => el.category);
    let uniqueCAtegories = concat(categories);

    let artist = datos.map((el) => el.artist);
    let uniqueArtist = concat(artist);

    let place = datos.map((el) => el.place);
    let uniquePlace = concat(place);

    let newObj = {
      datos,
      uniqueCAtegories,
      uniqueArtist,
      uniquePlace,
    };
    return dispatch({
      type: "GET_ALL_EVENTS",
      payload: newObj,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (body) => async (dispatch) => {
  try {
    const data = await axios.post("/createEvent", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export function searchLive(payload) {
  return {
    type: "SEARCH_LIVE",
    payload,
  };
}

///////////////////////USER_ACTIONS///////////////////////////////////

export const loginAuth = (body) => async (dispatch) => {
  try {
    let login = await axios.post("/login", body);
    return dispatch({
      type: "POST_LOGIN",
      payload: login.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerAuth = (body) => async (dispatch) => {
  try {
    let registro = await axios.post("/register", body);
    return dispatch({
      type: "POST_REGISTRO",
      payload: registro,
    });
  } catch (error) {
    console.log(error);
  }
};

export function userSignOut(datos) {
  return {
    type: "LOG_OUT",
    payload: datos,
  };
}

export function addGoogleUser(currentUser) {
  return async function (dispatch) {
    try {
      if (currentUser !== null && currentUser.hasOwnProperty("email")) {
        var addToDb = await axios.post("/user/google", {
          username: currentUser.displayName,
          email: currentUser.email,
          profile_picture: currentUser.photoURL,
          password: currentUser.uid,
        });
        return dispatch({
          type: "LOGIN_GOOGLE",
          payload: addToDb.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDetail() {
  return function (dispatch) {
    return dispatch({
      type: "CLEAN_DETAIL",
    });
  };
}

export function userAddFavorite(userId, idEvent) {
  return async function (dispatch) {
    const res = await axios.put("/favorites", {
      idUser: userId,
      idEvent: idEvent,
    });
    return dispatch({
      type: "USER_ADD_FAVORITE",
      payload: res.data.favorites,
    });
  };
}

export function userDeleteFavorite(userId, idEvent) {
  return async function (dispatch) {
    const res = await axios.delete("/favorites", {
      data: {
        idUser: userId,
        idEvent: idEvent,
      },
    });
    console.log(res.data);
    return dispatch({
      type: "DELETE_FAVORITE",
      payload: idEvent,
    });
  };
}

export function userGetFavorite(userId) {
  return async function (dispatch) {
    let favorites = await axios.get(`/favorites/${userId}`);
    return dispatch({ type: "USER_GET_FAVORITES", payload: favorites.data });
  };
}


export const changePassword = (userId , password) => async (dispatch) => {
  try {
      const change = await axios.put("/changePassword", {userId , password});
      return dispatch({
        type: "POST_PASSWORD",
        payload: change
      })
  } catch (error) {
    console.log(error);
  }
}

export const editProfile = (id, payload) => async (dispatch) => {

    try {
      let edit = await axios.put(`/user/${id}/profile`, payload);
      return dispatch({
      type: "EDIT_PROFILE", 
      payload: edit.data 
    })
    } catch (error) {
      console.log(error);
    } 
}

export const removeUsuario = (id, payload) => async (dispatch) => {

  try {
    let edit = await axios.put(`/user/${id}/profile`, payload);
  } catch (error) {
    console.log(error);
  } 
}


///////////////////////////CART///////////////////////////////////

export function addToCart(id, idUser) {
  return async function (dispatch) {
    try {
      const adding = axios.post(`/addcart`, {
        idUser: idUser,
        eventId: id,
      });
      const result = await adding;
      dispatch({
        type: "ADD_CART",
        payload: result.data.events,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addToCartGuest(id) {
  return async function (dispatch) {
    dispatch({
      type: "ADD_CART_GUEST",
      payload: id,
    });
  };
}

export function delCartUser(id) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DEL_CART_USER",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function delCart(id) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DEL_CART_GUEST",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function delAllCart() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DEL_ALL_CART",
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCart(userId) {
  return async function (dispatch) {
    let cart = await axios.get(`/cart?userId=${userId}`);
    return dispatch({ type: "GET_CART", payload: cart.data });
  };
}

export function removeOneEventFromCart(eventId, userId) {
  return async function (dispatch) {
    let deleteEvent = await axios.put(
      `/deleteeventcart?eventId=${eventId}&userId=${userId}`
    );
  };
}

export function clearCart(userId) {
  return async function (dispatch) {
    let clearAll = await axios.put(`/clearcart?userId=${userId}`);
    return dispatch({
      type: "CLEAR_CART",
    });
  };
}

export const getCartUser = (cart) => (dispatch) => {
  return dispatch({
    type: "CART_STATE_USER",
    payload: cart,
  });
};

export function checkoutCart(userId, token) {
  console.log(userId, token);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return async function (dispatch) {
    let checkoutCartId = await axios.put("/checkout", { userId }, config);
    return dispatch({
      type: "CHECKOUT_CART",
      payload: checkoutCartId.data,
    });
  };
}

export const cartStateSet = (cartState) => (dispatch) => {
  return dispatch({
    type: "CART_STATE",
    payload: cartState,
  });
};

export function sendEmailPassword(payload) {
  return async function () {
    let sending = await axios.put("/password", payload);
  };
}

export function updatePassword(payload) {
  console.log(payload);
  let { id, password } = payload;
  return async function () {
    let update = await axios.put(`resetpassword/${id}`, payload);
  };
}

export const deleteEventById = (id) => async (dispatch) => {
  const deleteEvent = await axios.delete(`/events/${id}`);
  
  return dispatch({
    type: "DELETE_EVENT_BY_ID",
    payload: id
  });
};

export const getEventsById = (id) => async (dispatch) => {
  try {
    const eventsById = await axios.get(`/dashboard/events/${id}`);
    return dispatch({
      type: "GET_EVENTS_BY_ID",
      payload: eventsById.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const postReviewScore =
  (eventId, userId, description, score, username) => async (dispatch) => {
    try {
      const result = await axios.post(`reviewScore/${eventId}`, {
        userId,
        description,
        score,
        username,
      });
      return dispatch({
        type: "POST_REVIEW",
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getReviews = (eventId) => async (dispatch) => {
  try {
    const result = await axios.get(`/reviewScor?eventId=${eventId}`);
    return dispatch({
      type: "GET_REVIEW",
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = (id) => async (dispatch) => {
  try {
    const comments = await axios.get(`/comments/${id}`);
    return dispatch({
      type: "GET_COMMENTS",
      payload: comments.data,
    });
  } catch (error) {
    console.log(error);
  }
};




export const gettinCartForMail = (payload) => {
  const {cart, user} = payload
  return async function () {
    let invoice = await axios.put(`/sendinvoice/${user.id}`, payload)
  }
} 

export const getPastOrders = (userId) => async (dispatch) => {
  try {
    const pastOrders = await axios.get(`/allcart/${userId}`);
    return dispatch({
      type: "GET_PAST_ORDERS",
      payload: pastOrders.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};


export const updateEvent = (data, id) => async (dispatch) => {
  try {
    const updatedEvent = await axios.post(`/event/${id}/update`, data);
    console.log(data, id);
    return dispatch({
      type: "UPDATE_EVENT",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const usuarios = await axios.get(`/users`);
  
    return dispatch({
      type: 'GET_USERS',
      payload: usuarios.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const upgradeToAdmin = (userId) => async (dispatch) => {

  try {
    const result = await axios.put('/upgradeToUser' , {userId})
    console.log(result)
    return dispatch({
      type: 'UPDATE_USER_TO_ADMIN',
      payload: result.data
    })
  } catch (error) {
    console.log(error)
  }

}

export const upgradeToUser = (userId) => async (dispatch) => {

  try {
    const result = await axios.put('/upgradeToAdmin' , {userId: userId})

    return dispatch({
      type: 'UPDATE_USER_TO_ADMIN',
      payload: result.data
    })
  } catch (error) {
    console.log(error)
  }

}

export const bannedToUser = (userId) => async (dispatch) => {
  try {
    const result = await axios.put(`/user/${userId}/banned` )
  
    return dispatch({
      type: 'BANNED_USER',
      payload: result.data
    })
  } catch (error) {
    console.log(error)
  }

}

export const unBanned = (userId) => async (dispatch) => {
  try {
    const result = await axios.put('/unbanUser' , {userId})
    return dispatch({
      type: 'BANNED_USER',
      payload: result.data
    })
  } catch (error) {
    console.log(error)
  }

}
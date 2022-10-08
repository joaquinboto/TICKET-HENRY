import { persisLocalStorage, removeLocalStorage } from "../utils/index";

const initialState = {
  // eventos
  events: [],
  eventsCopy: [],
  // existen?
  eventsDetail: {},
  // eventos por userid
  eventsById: [],
  // eventos con filtrado
  categories: [],
  artists: [],
  places: [],
  // --------------------
  searchLive: [],
  // Datos usuarios
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  // estados del carrito
  cartState: false,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  summary: localStorage.getItem("summary")
    ? JSON.parse(localStorage.getItem("summary"))
    : 0,
  purchasedCart: [],
  //favorites
  allFavourites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
  comments: [],
  // past orders
  pastOrders: [],

  currentUsers: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_COMMENTS': {
      return {
        ...state,
        comments: action.payload,
      };
    }

    case "POST_LOGIN":
      persisLocalStorage("user", action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case "POST_REGISTRO":
      return {
        ...state,
        userRegister: action.payload,
      };

    case "GET_EVENT_DETAIL":
      return {
        ...state,
        eventsDetail: action.payload,
      };

    case "GET_ALL_EVENTS":
      return {
        ...state,
        eventsCopy: action.payload.datos,
        events: action.payload.datos,
        categories: action.payload.uniqueCAtegories,
        artists: action.payload.uniqueArtist,
        places: action.payload.uniquePlace,
      };

    case "SEARCH_LIVE":
      return {
        ...state,
        searchLive: action.payload,
      };

    case "LOG_OUT":
      removeLocalStorage(action.payload);
      localStorage.clear();
      return {
        ...state,
        user: null,
      };

    case "LOGIN_GOOGLE":
      persisLocalStorage("user", action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case "CHECK_STATUS": {
      return {
        ...state,
      };
    }

    case "CLEAN_DETAIL":
      return {
        ...state,
        eventsDetail: {},
      };

    case "USER_GET_FAVORITES":
      localStorage.setItem("favorites", JSON.stringify(action.payload));
      return {
        ...state,
        allFavourites: action.payload,
      };

    case 'USER_ADD_FAVORITE': {
      localStorage.setItem('favorites', JSON.stringify(action.payload))
      return {
        ...state,
        allFavourites: action.payload,
      };
    }

    case 'DELETE_FAVORITE': {
      let favoritos = JSON.parse(localStorage.getItem("favorites"))
      let nuevoArray = favoritos.filter(e => e !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(nuevoArray))
      return {
        ...state,
        allFavourites: nuevoArray,
      };
    }

    ////////////CART///////////////////////
    case "ADD_CART_GUEST":
      const newEvent = {
        artist: action.payload.artist,
        category: action.payload.category,
        date: action.payload.date,
        description: action.payload.description,
        id: action.payload.id,
        image: action.payload.image,
        imageId: action.payload.imageId,
        isActive: action.payload.isActive,
        place: action.payload.place,
        price: action.payload.price,
        stock: action.payload.stock,
        cantidad: 1,
      };
      let cantidad = 1;
      let duplicado = state.cart.find(
        (producto) => producto.id === newEvent.id
      );
      if (duplicado === undefined) {
        localStorage.setItem("cart", JSON.stringify([...state.cart, newEvent]));
      } else {
        duplicado.cantidad += cantidad;
        let event = JSON.parse(localStorage.getItem("cart"));
        const idx = event.findIndex((producto) => producto.id === newEvent.id);
        event.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify([...state.cart]));
      }

      const eventosDelLocal = JSON.parse(localStorage.getItem("cart")); // ARRAY DE EVENTOS DEL LOCALSTORGA
      var suma = 0;
      for (let i = 0; i < eventosDelLocal.length; i++) {
        suma += eventosDelLocal[i].price * eventosDelLocal[i].cantidad;
      }
      localStorage.setItem("summary", JSON.stringify(suma));

      return {
        ...state,
        cart: eventosDelLocal,
        summary: suma,
      };

    case "ADD_CART":
      let newPrice = action.payload.reduce((acc, item) => acc + item.price ,0);
      return {
        ...state,
        cart: action.payload,
        summary: newPrice,
      };

    case "DEL_CART_GUEST":
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const idx = cartFromLocalStorage.filter(
        (idx) => idx.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(idx));
      let total = idx.map((e) => e.price).reduce((acc, item) => acc + item, 0);
      localStorage.setItem("summary", JSON.stringify(total));
      return {
        ...state,
        cart: idx,
        summary: total,
      };

    case "DEL_CART_USER":
      let itemToDelet = state.cart.find((p) => p.id === action.payload);
      let substr = itemToDelet.price;
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
        summary: state.summary - substr,
      };

    case "DEL_ALL_CART":
      return {
        ...state,
        cart: [],
        summary: 0,
      };

    case "GET_CART": {
      var arrayEvents = action.payload.events;
      localStorage.setItem("cart", JSON.stringify(arrayEvents));

      return {
        ...state,
        cart: arrayEvents, // TODOS LOS EVENTOS DEL CARRITO EN LA DB
        summary: action.payload.totalPrice, //ACA ESTA EL TOTAL DEL CARRITO DEL USUARIO
      };
    }

    case "CART_STATE_USER": {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case "CHECKOUT_CART": {
      return {
        ...state,
        purchasedCart: {
          Events: state.cart,
          Total: state.summary,
          CartId: action.payload,
        },
        summary: 0,
        cart: [],
      };
    }

    case "EMPTY_PURCHASED_CART": {
      return {
        ...state,
        purchasedCart: { Events: [], Total: 0, CartId: "" },
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
        summary: 0,
      };
    }

    case "CART_STATE": {
      return {
        ...state,
        cartState: action.payload,
      };
    }

    case "GET_EVENTS_BY_ID":
      return {
        ...state,
        eventsById: action.payload,
      };

    case "DELETE_EVENT_BY_ID":
      console.log(action.payload);
      let nuevosEventos = state.eventsById.filter(event => event.id !== action.payload)
      console.log(nuevosEventos);
      return {
        ...state,
        eventsById: nuevosEventos
      };

    ////////// REVIEWS //////////
    case 'GET_REVIEW': {
      return {
        ...state,
        eventsDetail: {
          ...state.eventsDetail,
          comments: action.payload
        },
      }
    }

    case 'POST_REVIEW': {
      return {
        ...state,
        eventsDetail: {
          ...state.eventsDetail,
          comments: [...state.eventsDetail.comments, action.payload]
        },
      }
    }

    case 'GET_PAST_ORDERS': {
      return {
        ...state,
        pastOrders: [...state.pastOrders , action.payload]
      }
    }

    case 'EDIT_PROFILE':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }

    case "UPDATE_EVENT": {
      return {
        ...state,
      };
    }

    case 'GET_USERS': {
      
      return {
        ...state,
        currentUsers: action.payload
      }
    }

    case 'UPDATE_USER_TO_ADMIN': 
    return {
      ...state,
      currentUsers: action.payload
    }

    case 'BANNED_USER': {
      
      return {
        ...state,
        currentUsers: action.payload
      }
    }

    default:
      return state;
  }
}

export default rootReducer;

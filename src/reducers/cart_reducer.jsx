import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT
} from "../actions";

const cart_reducer = (state, action) => {
  const actionType = action.type;
  if (actionType === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    const tempItem = state.cart.find((i) => i.id === id + color);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      };
      return { ...state, cart: [ ...state.cart, newItem ] };
    }
  }
  if (actionType === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((p) => p.id !== action.payload.id);

    return { ...state, cart: tempCart };
  }

  if (actionType === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (actionType === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (actionType === COUNT_CART_TOTALS) {
    const totals = state.cart.reduce(
      (total, item) => {
        let { items, amount } = total;

        items = total.items + item.amount;
        amount = total.amount + item.price * item.amount;

        return { items, amount };
      },
      { items: 0, amount: 0 }
    );
    return { ...state, total_items: totals.items, total_amount: totals.amount };
  } else {
    throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;

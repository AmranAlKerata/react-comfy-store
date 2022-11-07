import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from "../actions";

const filter_reducer = (state, action) => {
  const actionType = action.type;
  if (actionType === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [ ...action.payload ],
      filtered_products: [ ...action.payload ],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    };
  }
  if (actionType === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (actionType === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (actionType === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (actionType === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [ ...filtered_products ];
    if (sort === "price-lowest") {
      tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filtered_products: tempProducts };
  }
  if (actionType === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value
      }
    };
  }
  if (actionType === FILTER_PRODUCTS) {
    const {
      all_products,
      filters: { text, category, company, color, price, shipping }
    } = state;

    let tempProducts = [ ...all_products ];

    // filtering

    // Search Filter

    if (text) {
      tempProducts = tempProducts.filter((p) => {
        return p.name.toLowerCase().includes(text.toLowerCase());
      });
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter((p) => {
        return p.category.toLowerCase() === category.toLowerCase();
      });
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((p) => {
        return p.company.toLowerCase() === company.toLowerCase();
      });
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((p) => {
        return p.colors.includes(color);
      });
    }

    tempProducts = tempProducts.filter((p) => {
      return p.price <= price;
    });

    if (shipping) {
      tempProducts = tempProducts.filter((p) => {
        return p.shipping;
      });
    }

    return { ...state, filtered_products: tempProducts };
  }
  if (actionType === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false
      }
    };
  } else {
    throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;

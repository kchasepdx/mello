import {
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
} from "../constants/productConstants";

function productSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        success: true,
      };
    case PRODUCT_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
}

function productDeleteReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
}

function productListReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function productDetailReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function productCategoryReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return {
        loadingCategory: true,
        category: [],
      };
    case PRODUCT_CATEGORY_SUCCESS:
      return {
        loadingCategory: false,
        categoryList: action.payload,
      };
    case PRODUCT_CATEGORY_FAIL:
      return {
        loadingCategory: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function productInvetoryUpdateReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_INVENTORY_REQUEST:
      return {
        loading: true,
        toUpdate: action.payload,
      };
    case UPDATE_INVENTORY_SUCCESS:
      return {
        loading: false,
        update: action.payload,
        success: true,
      };
    case UPDATE_INVENTORY_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
}

export {
  productSaveReducer,
  productListReducer,
  productDetailReducer,
  productCategoryReducer,
  productDeleteReducer,
  productInvetoryUpdateReducer,
};

import { createStore } from 'redux';

const initialState = {
  lists: {
    default: []
  },
  currentList: 'default',
  categories: ['fresh produce', 'grains', 'meat', 'spices', 'oils', 'snacks', 'baking goods'],
  sizes: ['small', 'medium', 'large']
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        lists: {
          ...state.lists,
          [state.currentList]: [...state.lists[state.currentList], action.payload]
        }
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        lists: {
          ...state.lists,
          [state.currentList]: state.lists[state.currentList].filter((_, index) => index !== action.payload)
        }
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        lists: {
          ...state.lists,
          [state.currentList]: state.lists[state.currentList].map((item, index) =>
            index === action.payload.index ? action.payload.newItem : item
          )
        }
      };
    case 'SET_CURRENT_LIST':
      return {
        ...state,
        currentList: action.payload
      };
    case 'ADD_LIST':
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload]: []
        }
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

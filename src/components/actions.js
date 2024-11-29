import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  lists: {
    default: []  
  },
  currentList: 'default',  
  categories: ['fresh produce', 'grains', 'meat', 'spices', 'oils', 'snacks', 'baking goods'],
  sizes: ['small', 'medium', 'large']
};


const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    
    addItem(state, action) {
      const { name, quantity, notes, category, size } = action.payload;
      state.lists[state.currentList].push({ name, quantity, notes, category, size });
    },

    
    removeItem(state, action) {
      const index = action.payload;
      state.lists[state.currentList].splice(index, 1);
    },
    
   
    editItem(state, action) {
      const { index, newItem } = action.payload;
      state.lists[state.currentList][index] = newItem;
    },

    setCurrentList(state, action) {
      state.currentList = action.payload;
    },

    

    addList(state, action) {
      const listName = action.payload;
      if (!state.lists[listName]) {
        state.lists[listName] = [];
      }
    }
  }
});

export const { addItem, removeItem, editItem, setCurrentList, addList } = shoppingSlice.actions;


export default shoppingSlice.reducer;

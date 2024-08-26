export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: item
});

export const removeItem = (index) => ({
  type: 'REMOVE_ITEM',
  payload: index
});

export const editItem = (index, newItem) => ({
  type: 'EDIT_ITEM',
  payload: { index, newItem }
});

export const setCurrentList = (listName) => ({
  type: 'SET_CURRENT_LIST',
  payload: listName
});

export const addList = (listName) => ({
  type: 'ADD_LIST',
  payload: listName
});

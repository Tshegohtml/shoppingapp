import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentList, addList } from './components/actions';

const ListSelector = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => Object.keys(state.lists));
  const currentList = useSelector((state) => state.currentList);

  const handleListChange = (e) => {
    dispatch(setCurrentList(e.target.value));
  };

  const handleCreateList = () => {
    const listName = prompt('Enter new list name:');
    if (listName && !lists.includes(listName)) {
      dispatch(addList(listName));
    }
  };

  return (
    <div>
      <select onChange={handleListChange} value={currentList}>
        {lists.map((list) => (
          <option key={list} value={list}>{list}</option>
        ))}
      </select>
      <button onClick={handleCreateList}>Create New List</button>
    </div>
  );
};

export default ListSelector;

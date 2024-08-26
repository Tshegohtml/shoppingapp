import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, setCurrentList } from './actions';
import './shoppingList.css';

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const lists = useSelector((state) => state.lists);
  const currentList = useSelector((state) => state.currentList);
  const items = lists[currentList] || [];
  const dispatch = useDispatch();

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  const handleListChange = (e) => {
    dispatch(setCurrentList(e.target.value));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'quantity') {
      return a.quantity - b.quantity;
    } else if (sortOption === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div>
      {/* <select onChange={handleListChange}>
        {Object.keys(lists).map(list => (
          <option key={list} value={list}>{list}</option>
        ))}
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items"
      />
      <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="name">Sort by Name</option>
        <option value="quantity">Sort by Quantity</option>
        <option value="category">Sort by Category</option>
      </select> */}
      <ul>
        {sortedItems.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> (Quantity: {item.quantity}, Size: {item.size}, Category: {item.category}, Notes: {item.notes}) 
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, setCurrentList, editItem } from './actions';
import './shoppingList.css';

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [editingItem, setEditingItem] = useState(null); 
  const [newItemData, setNewItemData] = useState({
    name: '',
    quantity: 1,
    notes: '',
    category: '',
    size: '',
  });
  
  const lists = useSelector((state) => state.shopping.lists);
  const currentList = useSelector((state) => state.shopping.currentList);
  const items = lists[currentList] || [];
  const dispatch = useDispatch();

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  const handleListChange = (e) => {
    dispatch(setCurrentList(e.target.value));
  };

  const handleEditItem = (item, index) => {
    setEditingItem(index);
    setNewItemData(item);
  };

  
    const handleUpdateItem = () => {
      dispatch(editItem({ index: editingItem, newItem: newItemData }));  
      setEditingItem(null);
      setNewItemData({
        name: '',
        quantity: 1,
        notes: '',
        category: '',
        size: '',
      });
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
    <div className="shopping-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {sortedItems.map((item, index) => (
          <li key={index} className="shopping-list-item">
            <div>
              <strong>{item.name}</strong> (Quantity: {item.quantity}, Size: {item.size}, Category: {item.category}, Notes: {item.notes})
            </div>
            <div className="button-container">
              <button onClick={() => handleRemoveItem(index)} className="remove-button">Remove</button>
              <button onClick={() => handleEditItem(item, index)} className="edit-button">Edit</button>
            </div>
          </li>
        ))}
      </ul>

      {editingItem !== null && (
        <div className="edit-form">
          <h3>Edit Item</h3>
          <input
            type="text"
            value={newItemData.name}
            onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
            placeholder="Item name"
          />
          <input
            type="number"
            value={newItemData.quantity}
            onChange={(e) => setNewItemData({ ...newItemData, quantity: e.target.value })}
            min="1"
            placeholder="Quantity"
          />
          <input
            type="text"
            value={newItemData.notes}
            onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
            placeholder="Notes"
          />
          <button onClick={handleUpdateItem} className="update-button">Update</button>
          <button onClick={() => setEditingItem(null)} className="cancel-button">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;

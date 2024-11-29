import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, removeItem } from "./actions";
import { FaFacebook } from 'react-icons/fa'; // Facebook Icon
import CryptoJS from "crypto-js"; // Import CryptoJS for encryption
import "./shoppinForm.css";
import logo from './png.webp';

const ShoppingForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // State for online/offline status
  const [privacySecured, setPrivacySecured] = useState(true); // State for privacy and security message
  const dispatch = useDispatch();

  const categories = [
    "Fruits", "Vegetables", "Dairy", "Grains", "Meat", "Seafood", "Snacks",
    "Frozen Food", "Beverages", "Bakery", "Spices", "Canned Goods", "Condiments"
  ];

  const sizes = ["Small", "Medium", "Large", "Extra Large", "One Size"];

  const items = useSelector((state) => state.shopping.lists[state.shopping.currentList] || []);

  // Encrypt shopping list data before storing it
  const encryptData = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
    localStorage.setItem('shoppingList', ciphertext);
  };

  // Decrypt shopping list data
  const decryptData = () => {
    const ciphertext = localStorage.getItem('shoppingList');
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret-key');
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) || [];
    }
    return [];
  };

  // Sync localStorage with Redux state when items change
  useEffect(() => {
    if (items.length > 0) {
      encryptData(items); // Encrypt and save to localStorage
    }
  }, [items]);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedItems = decryptData(); // Decrypt data from localStorage
    if (savedItems.length > 0) {
      savedItems.forEach(item => dispatch(addItem(item)));
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      const item = { name, quantity, notes, category, size };

      if (editIndex !== null) {
        // Edit item
        const updatedItems = [...items];
        updatedItems[editIndex] = item;
        encryptData(updatedItems); // Encrypt and save updated data
        dispatch(editItem({ index: editIndex, newItem: item }));
        setEditIndex(null);
      } else {
        // Add new item
        const newItems = [...items, item];
        encryptData(newItems); // Encrypt and save new data
        dispatch(addItem(item));
      }

      setName("");
      setQuantity(1);
      setNotes("");
      setCategory("");
      setSize("");
    }
  };

  const handleEdit = (index) => {
    const item = items[index];
    setName(item.name);
    setQuantity(item.quantity);
    setNotes(item.notes);
    setCategory(item.category);
    setSize(item.size);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    encryptData(updatedItems); // Encrypt and save updated data after deletion
    dispatch(removeItem(index));
  };

  const handleShare = () => {
    const itemsToShare = items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      size: item.size,
      notes: item.notes,
    }));

    const shareData = {
      title: 'Shopping List',
      text: `Here is my shopping list: ${itemsToShare.map(item => `${item.name} - ${item.quantity}`).join(', ')}`,
      url: window.location.href, 
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => {
        console.error("Error sharing: ", error);
      });
    } else {
      alert("Your shopping list:\n" + JSON.stringify(itemsToShare, null, 2));
    }
  };

  // Facebook sharing link generator
  const handleFacebookShare = () => {
    const shareText = `Here is my shopping list: ${items.map(item => `${item.name} - ${item.quantity}`).join(', ')}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="form-container">
      <img src={logo} className="img-logo" alt="Logo" />
      
      {/* Display online/offline status */}
      <div className={`status-indicator ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "You are online" : "You are offline"}
      </div>

      {/* Display security/privacy message */}
      {privacySecured && (
        <div className="privacy-message">
          <p>Your data is securely encrypted and handled with care to protect your privacy.</p>
        </div>
      )}
      
      <h2>{editIndex !== null ? "Edit Shopping Item" : "Create a Shopping Item"}</h2>
      <form onSubmit={handleSubmit} className="shopping-form">
        <div className="box-form">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item name"
              required
            />
          </div>

          <div className="input-left">
            <input
              type="number"
              className="form-input"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max="20"
              placeholder="Quantity"
            />
          </div>
        </div>

        <div className="box-form">
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Select size</option>
              {sizes.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />

        <button className="add-item-button" type="submit">
          {editIndex !== null ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="items-list">
        <ul>
          {items.length > 0 ? (
            items.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.quantity} pcs{" "}
                {item.category && `| Category: ${item.category}`}{" "}
                {item.size && `| Size: ${item.size}`}{" "}
                {item.notes && `| Notes: ${item.notes}`}{" "}
                
                <div className="button-container">
                  <button onClick={() => handleEdit(index)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No items in the shopping list.</p>
          )}
        </ul>
      </div>

      <button onClick={handleShare} className="share-button">
        Share Shopping List
      </button>

      <button onClick={handleFacebookShare} className="facebook-share-button">
        <FaFacebook /> Share on Facebook
      </button>
    </div>
  );
};

export default ShoppingForm;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, removeItem } from "./actions";
import { FaFacebook } from 'react-icons/fa'; 
import CryptoJS from "crypto-js"; 
import "./shoppinForm.css";

const ShoppingForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [privacySecured, setPrivacySecured] = useState(true); 
  const [filterCategory, setFilterCategory] = useState(""); 

  const dispatch = useDispatch();

  const categories = [
    "Fruits", "Vegetables", "Dairy", "Grains", "Meat", "Seafood", "Snacks",
    "Frozen Food", "Beverages", "Bakery", "Spices", "Canned Goods", "Condiments"
  ];

  const sizes = ["Small", "Medium", "Large", "Extra Large", "One Size"];

  const items = useSelector((state) => state.shopping.lists[state.shopping.currentList] || []);

  const encryptData = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
    localStorage.setItem('shoppingList', ciphertext);
  };

  const decryptData = () => {
    const ciphertext = localStorage.getItem('shoppingList');
    if (ciphertext) {
      try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret-key');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData || [];
      } catch (error) {
        console.error("Decryption error: ", error);
        return [];
      }
    }
    return [];
  };

  useEffect(() => {
    if (items.length > 0) {
      encryptData(items);
    }
  }, [items]);

  useEffect(() => {
    const savedItems = decryptData();
    if (savedItems.length > 0) {
      savedItems.forEach(item => dispatch(addItem(item)));
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      const item = { name, quantity, notes, category, size };

      if (editIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editIndex] = item;
        encryptData(updatedItems);
        dispatch(editItem({ index: editIndex, newItem: item }));
        setEditIndex(null);
      } else {
        const newItems = [...items, item];
        encryptData(newItems);
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
    if (index === 'all') {
      encryptData([]); 
      dispatch(removeItem()); 
    } else {
      
      const updatedItems = items.filter((_, i) => i !== index);
      encryptData(updatedItems); 
      dispatch(removeItem(index)); 
    }
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

  const handleFacebookShare = () => {
    const shareText = `Here is my shopping list: ${items.map(item => `${item.name} - ${item.quantity}`).join(', ')}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };


  const filteredItems = filterCategory
    ? items.filter(item => item.category === filterCategory)
    : items;

  return (
    <div className="form-container">
    
      <div className={`status-indicator ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "You are online" : "You are offline"}
      </div>

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

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className="category-button"
            onClick={() => setFilterCategory(cat)}
            style={{ backgroundColor: "chocolate", color: "white" }}
          >
            {cat}
          </button>
        ))}
        <button
          className="category-button"
          onClick={() => setFilterCategory("")}
          style={{ backgroundColor: "chocolate", color: "white" }}
        >
          All Items
        </button>
      </div>

      <div>
  <ul>
    <div  className="items-list">

    {filteredItems.length > 0 ? (
      filteredItems.map((item, index) => (

        
        <li key={index} className="item-card">
          <div className="card-content">
            <strong>{item.name}</strong> - {item.quantity} pcs{" "}
            {item.category && `| Category: ${item.category}`}{" "}
            {item.size && `| Size: ${item.size}`}{" "}
            {item.notes && `| Notes: ${item.notes}`}{" "}
          </div>
          <div className="button-container">
            <button onClick={() => handleEdit(index)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDelete('all')} className="delete-all-button">
  Delete All Items
</button>
          </div>
        </li>
      ))
    ) : (
      <p>No items in the shopping list.</p>
    )}
    </div>
   
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

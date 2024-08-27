import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./actions";
import "./shoppinForm.css";

const ShoppingForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const sizes = useSelector((state) => state.sizes);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addItem({ name, quantity, notes, category, size }));
      setName("");
      setQuantity(1);
      setNotes("");
      setCategory("");
      setSize("");
    }
  };

  return (
    <div className="form-container">
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
        

          <div  className="box-form">
             <div>  <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select> </div>

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
         
          
        
        <button
          className="add-item-button"
          type="submit"
          onClick={handleSubmit}
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ShoppingForm;

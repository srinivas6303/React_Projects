import React, { useState } from 'react';
import './Store.css'; 

function Store() {
  const [apple, setApple] = useState(false);
  const [banana, setBanana] = useState(false);
  const [orange, setOrange] = useState(false);

  const [value, setValue] = useState("Select All");
  const [selectedList, setSelectedList] = useState([]);

  function handleSelector() {
    const select = !(apple && banana && orange);
    setApple(select);
    setBanana(select);
    setOrange(select);

    if (select) {
      setValue("Deselect All");
      setSelectedList(["Apple", "Banana", "Orange"]);
    } else {
      setValue("Select All");
      setSelectedList([]);
    }
  }

  function handleItemChange(fruit, setFruit, isChecked) {
    setFruit(!isChecked);

    if (!isChecked) {
      setSelectedList([...selectedList, fruit]);
    } else {
      setSelectedList(selectedList.filter((item) => item !== fruit));
    }
  }

  return (
    <div className="container">
      <h1 className="heading">🛒 Store</h1>

      <div className="checkbox-group">
        <label>
          <input type="checkbox" checked={apple} onChange={() => handleItemChange("Apple", setApple, apple)} />
          <span>🍎 Apple</span>
        </label>
        <label>
          <input type="checkbox" checked={banana} onChange={() => handleItemChange("Banana", setBanana, banana)} />
          <span>🍌 Banana</span>
        </label>
        <label>
          <input type="checkbox" checked={orange} onChange={() => handleItemChange("Orange", setOrange, orange)} />
          <span>🍊 Orange</span>
        </label>
      </div>

      <button className="selector-button" onClick={handleSelector}>{value}</button>

      <h3 className="selected-heading">✅ Selected Items</h3>
      {selectedList.length > 0 ? (
        <ul className="selected-list">
          {selectedList.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-msg">No items selected</p>
      )}
    </div>
  );
}

export default Store;

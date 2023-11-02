import { useState } from "react";
import { useDispatch } from "react-redux";
import "./EntryModal.css";
import { addEntry } from "../../Redux/Actions/Actions";

const EntryModal = ({ isOpen, onClose ,entryType }) => {
  const dispatch = useDispatch();

  // const { action, itemToBeUpdated } = isOpen;

  const [entryDetails, setEntryDetails] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const categories = ["active", "passive"];

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEntryDetails((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addEntry(entryType,entryDetails))
    setEntryDetails({
      description: "",
      amount: "",
      category: "",
      date: "",
    });
    onClose();
  };
  return (
    <div className={`modal ${"" ? "open" : ""}`}>
      <div className="modal-content">
        <form onSubmit={submitHandler}>
          
        <label htmlFor="category">Category:</label>
          <select
            onChange={inputHandler}
            value={entryDetails?.category}
            name="category"
            id="category"
            required
          >
            <option value="" disabled>
              Select an Item
            </option>
            {categories?.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="description">Description: </label>
          <input
            type="text"
            placeholder="Enter description"
            id="description"
            name="description"
            onChange={inputHandler}
            required
            value={entryDetails?.description}
          />

          <label htmlFor="amount">Amount: </label>
          <input
            type="number"
            placeholder="Enter Amount "
            id="amount"
            name="amount"
            onChange={inputHandler}
            required
            min={1}
            value={entryDetails?.amount}
          />

          

          <label htmlFor="date">Date: </label>
          <input
            type="date"
            placeholder="Select Date"
            id="date"
            name="date"
            onChange={inputHandler}
            required
            value={entryDetails?.date}
          />

          <button className="btn" type="submit">
          Add  
          </button>
          <button className="btn" onClick={onClose}>
          Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default EntryModal;

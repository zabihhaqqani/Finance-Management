import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import EntryModal from "../Components/Modals/EntryModal";
import { fetchIncomeData } from "../Redux/Actions/Actions";
import "./Income.css";
const moment = require("moment");

const Income = () => {
  const dispatch = useDispatch();
  const incomeData = useSelector((state) => state?.incomeData);
  const option = useSelector((state) => state?.option);
  const loading = useSelector((state) => state?.loading);
  const sortIncome = useSelector((state) => state?.sortIncome);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      dispatch({ type: "ALL" });
    } else if (selectedValue === "active") {
      dispatch({ type: "ACTIVE" });
    } else if (selectedValue === "passive") {
      dispatch({ type: "PASSIVE" });
    }
  };
  const dataSortedByAmount = [...incomeData]?.sort((a, b) => {
    if (sortIncome === "highest") {
      return b.amount - a.amount;
    } else if (sortIncome === "lowest") {
      return a.amount - b.amount;
    }
  });

  const dataFilteredByCategory = [...dataSortedByAmount]?.filter((entry) =>
    option === "All" ? entry : entry.category === option
  );

  const totalIncome = [...dataFilteredByCategory]?.reduce(
    (total, curr) => total + curr.amount,
    0
  );

  useEffect(() => {
    dispatch(fetchIncomeData());
  }, [dispatch]);

  return (
    <div>
      <h2>Income Management</h2>
      {isOpen && (
        <EntryModal isOpen={isOpen} onClose={onClose} entryType={"income"} />
      )}

      <button onClick={() => setIsOpen(!isOpen)}>Add Income Entry</button>

      <div>
        <div className="sort-container">
          <label
            className="label"
            htmlFor="highest"
            onClick={() => dispatch({ type: "HIGHEST_TO_LOWEST" })}
          >
            Highest To Lowest Amount
          </label>
          <input
            className="label"
            type="radio"
            name="options"
            id="highest"
            onChange={() => dispatch({ type: "HIGHEST_TO_LOWEST" })}
            checked={sortIncome === "highest"}
            value="highest"
          />
          <label
            className="label"
            htmlFor="lowest"
            onChange={() => dispatch({ type: "LOWEST_TO_HIGHEST" })}
          >
            Lowest To Highest Amount
          </label>
          <input
            className="label"
            type="radio"
            name="options"
            id="lowest"
            onChange={() => dispatch({ type: "LOWEST_TO_HIGHEST" })}
            checked={sortIncome === "lowest"}
          />
        </div>
        <div>
          <label htmlFor="menu">Select Category:</label>
          <select name="menu" id="menu" onChange={handleOptionChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="passive">Passive</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        {/* Add loader while data is being fetched */}
        {loading ? (
          <Oval color="#0073e6" height={50} width={50} />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {dataFilteredByCategory?.length > 0 ? (
                dataFilteredByCategory?.map((item) => (
                  <tr key={item?._id}>
                    <td>{moment(item?.date).format("MMM Do YY")}</td>
                    <td>{item?.description}</td>
                    <td>{item?.category}</td>
                    <td>{item?.amount} ₹</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Items</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h3 style={{ margin: "0.5rem" }}>
          Total Income Amount: {totalIncome} ₹
        </h3>
      </div>
    </div>
  );
};

export default Income;

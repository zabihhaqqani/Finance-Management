import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExpensesData,
    fetchIncomeData,
    fetchSavingsData,
} from "../Redux/Actions/Actions";
import "./Reports.css";

const Reports = () => {
  const dispatch = useDispatch();
  const [showReport, setShowReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState("Income vs Expenses");
  const incomeData = useSelector((state) => state?.incomeData);
  const expenseData = useSelector((state) => state?.expensesData);
  const savingsData = useSelector((state) => state?.savingsData);

  const handleReportTypeChange = (event) => {
    setSelectedReport(event.target.value);
    setShowReport(false);
  };

  const generateReport = () => {
    setShowReport(!showReport);
  };

  const totalIncome = incomeData?.reduce(
    (total, curr) => total + curr?.amount,
    0
  );

  const totalExpense = expenseData?.reduce(
    (total, curr) => total + curr?.amount,
    0
  );

  const totalSavings = savingsData?.reduce(
    (total, curr) => total + curr?.amount,
    0
  );

  const totalActiveExpense = expenseData?.reduce((total, item) => {
    if (item.category === "active") {
      return total + item.amount;
    }
    return total;
  }, 0);

  const totalPassiveExpense = expenseData?.reduce((total, item) => {
    if (item.category === "passive") {
      return total + item.amount;
    }
    return total;
  }, 0);

  useEffect(() => {
    dispatch(fetchIncomeData());
    dispatch(fetchExpensesData());
    dispatch(fetchSavingsData());
  }, []);

  return (
    <div>
      <h1>Financial Reports</h1>

      <label>Choose Report Type:</label>
      <select value={selectedReport} onChange={handleReportTypeChange}>
        <option value="Income vs Expenses">Income vs Expenses</option>
        <option value="Expense Breakdown">Expense Breakdown</option>
      </select>

      <button onClick={generateReport}>Generate Report</button>

      {showReport ? (
        <div className="report-container-main">
          {selectedReport === "Income vs Expenses" && (
            <div className="report-container">
              <h2>Income vs Expenses</h2>
              <p>
                <strong>Total Income: </strong>
                {totalIncome} ₹
              </p>
              <p>
                <strong>Total Expenses: </strong>
                {totalExpense} ₹
              </p>
              <p>
                <strong>Total Savings: </strong>
                {totalSavings} ₹
              </p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

        {showReport ? (
          <div className="report-container-main">
            {selectedReport === "Expense Breakdown" && (
              <div className="report-container">
                <h2>Expense Breakdown</h2>
                <p>
                  <strong>Total Expense: </strong>
                  {totalExpense} ₹
                </p>
                <p>
                  <strong>Active Expense: </strong>
                  {totalActiveExpense} ₹
                </p>
                <p>
                  <strong>Passive Expense: </strong>
                  {totalPassiveExpense} ₹
                </p>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
     
    </div>
  );
};

export default Reports;

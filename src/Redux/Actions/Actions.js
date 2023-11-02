import axios from "axios";

const apiEndpoint = "https://finance-management-backend.zabihhaqqani1.repl.co";

export const fetchIncomeData = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await axios.get(`${apiEndpoint}/income`);
    dispatch({ type: "FETCH_INCOME_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ERROR_FETCHING_DATA" });

    console.error("Error while fetching data", error);
  }
};

export const fetchExpensesData = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await axios.get(`${apiEndpoint}/expenses`);
    
    dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ERROR_FETCHING_DATA" });

    console.error("Error while fetching data", error);
  }
};

export const fetchSavingsData = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await axios.get(`${apiEndpoint}/savings`);
    dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ERROR_FETCHING_DATA" });

    console.error("Error while fetching data", error);
  }
};


export const addEntry = (entryType, entryDetails) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/add-${entryType}`,
      entryDetails
    );
    dispatch({
      type: `ADD_${entryType}_SUCCESS`,
      payload: response.data[entryType],
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

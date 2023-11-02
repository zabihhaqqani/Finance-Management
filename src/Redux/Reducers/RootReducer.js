const initialState = {
  incomeData: [],
  savingsData: [],
  expensesData: [],
  sortIncome: "",
  option: "All",
  loading:true
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INCOME_SUCCESS":
      return {
        ...state,
        incomeData: action.payload,
        loading:false
      };
    case "FETCH_EXPENSES_SUCCESS":
      return {
        ...state,
        expensesData: action.payload,
        loading:false

      };
    case "FETCH_SAVINGS_SUCCESS":
      return {
        ...state,
        savingsData: action.payload,
        loading:false

      };

    case `ADD_income_SUCCESS`:
      return {
        ...state,
        incomeData: [...state.incomeData, action.payload],
      };
    case `ADD_expenses_SUCCESS`:
      return {
        ...state,
        expensesData: [...state.expensesData, action.payload],
      };
    case "HIGHEST_TO_LOWEST":
      return {
        ...state,
        sortIncome: "highest",
      };
    case "LOWEST_TO_HIGHEST":
      return {
        ...state,
        sortIncome: "lowest",
      };
    case "ALL":
      return {
        ...state,
        option: "All",
      };
    case "ACTIVE":
      return {
        ...state,
        option: "active",
      };
    case "PASSIVE":
      return {
        ...state,
        option: "passive",
      };

     case "FETCH_DATA_LOADING":
        return {
            ...state,
            loading:true
        }
    default:
      return state;
  }
};

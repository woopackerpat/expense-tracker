import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import {
  transactionReducer,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
} from "../reducers/transactionReducer";

const TransactionContext = createContext();

function TransactionContextProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/transactions")
      .then((res) => {
        console.log(res);
        dispatch({
          type: FETCH_TRANSACTION,
          value: { transactions: res.data.transactions },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   useEffect(() => {
  //     const fetchTransactions = async () => {
  //      try {const res = await axios.get("http://localhost:8080/transactions");
  //       dispatch({
  //           type: FETCH_TRANSACTION,
  //           value: {transactions: res.data.transactions}
  //       })} catch (err) {
  //           console.log(err)
  //       }
  //     };
  //   }, []);
  const createTransaction = async (transaction) => {
    const { payeeInput, amountInput, dateInput, catInput } = transaction;
    const res = await axios.post("http://localhost:8080/transactions", {
      payee: payeeInput,
      amount: +amountInput,
      date: dateInput,
      categoryId: catInput,
    });

    const newTransaction = res.data.transaction;
    dispatch({type: CREATE_TRANSACTION, value: newTransaction})
  };

  return (
    <TransactionContext.Provider
      value={{ transactions: state, dispatch, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionContextProvider };

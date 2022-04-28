import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { TransactionContext } from "../contexts/TransactionContext";
import {
  DELETE_TRANSACTION,
  FETCH_TRANSACTION,
} from "../reducers/transactionReducer";
import validator from "validator";

const INCOME = "INCOME";
const EXPENSE = "EXPENSE";

function TransactionForm() {
  const [transaction, setTransaction] = useState({});
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { dispatch } = useContext(TransactionContext);
  // const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState(EXPENSE);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [payeeInput, setPayeeInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [catInput, setCatInput] = useState("");
  const [errorAmountInput, setErrorAmountInput] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  // check error

  const [error, setError] = useState({});

  // const []

  const { createTransaction } = useContext(TransactionContext);

  useEffect(() => {
    if (params.transactionId) {
      axios
        .get("http://localhost:8080/transactions/" + params.transactionId)
        .then((res) => {
          if (res.data.transaction === null) {
            setNotFoundError(true);
          }
          setTransaction(res.data.transaction);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.transactionId]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("http://localhost:8080/categories");
      const resultExpenses = res.data.categories.filter(
        (el) => el.type === EXPENSE
      );
      const resultIncomes = res.data.categories.filter(
        (el) => el.type === INCOME
      );
      // setCategories(res.data.categories);
      setExpenses(resultExpenses);
      setIncomes(resultIncomes);
      if (categoryType === EXPENSE) {
        setSelectedCategoryId(resultExpenses[0].id);
      } else {
        setSelectedCategoryId(resultIncomes[0].id);
      }
    };
    fetchCategory();
  }, []);

  //check number

  const handleAmountOnchange = (value) => {
    if (validator.isInt(value)) {
      setErrorAmountInput(false);
    } else {
      setErrorAmountInput(true);
    }

    setAmountInput(value);
  };

  //เขียนเงื่อนไขเพื่อ check ว่า state ใน location มีค่าหรือเปล่า ถ้าไม่มีให้ fetch
  // const location = useLocation();
  // console.log(location);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    //ถ้าเซ็ต object ใหม่ทุกครั้ง จะได้แต่ตัวสุดท้าย ต้องสร้าง {} ขึ้นมาก่อน แล้วใช้วิธีเพิ่มค่า

    const inputError = {};

    if (validator.isEmpty(payeeInput)) {
      // setError({ payee: 'Payee is required'})
      inputError.payee = "Payee is required";
    }

    if (validator.isEmpty(amountInput)) {
      // setError({amount: 'Amount is required'})
      inputError.amount = "Amount is required";
    } else if (!validator.isNumeric(amountInput)) {
      // setError({amount: 'Amount must be numberic'})
      inputError.amount = "Amount must be numeric";
    } else if (amountInput <= 0) {
      inputError.amount = "Amount must be greater than zero";
    }

    if (validator.isEmpty(dateInput)) {
      // setError({date: 'Date is required'})
      inputError.date = "Date is required";
    }
    // เช็คว่าเป็น Empty object หรือเปล่า
    if (Object.keys(inputError).length > 0) {
      setError(inputError);
    } else {
      //กรณีที่ error ไปแล้วรอบนึง ถ้าไม่เซ็ต {} ตอน send data จะยังเป็นสีแดงอยู่
      setError({});
    }

    try {
      await axios.post("http://localhost:8080/transactions", {
        payee: payeeInput,
        categoryId: selectedCategoryId,
        amount: +amountInput,
        date: dateInput,
      });
      const res = await axios.get("http://localhost:8080/transactions");
      dispatch({
        type: FETCH_TRANSACTION,
        value: { transactions: res.data.transactions },
      });
    } catch (err) {
      console.log(err);
    }

    if (!errorAmountInput) {
      createTransaction({
        payeeInput,
        amountInput,
        dateInput,
        catInput,
        categoryType,
      });
      navigate("/home");
    }
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        "http://localhost:8080/transactions/" + params.transactionId
      );
      dispatch({
        type: DELETE_TRANSACTION,
        value: { id: params.transactionId },
      });
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  // ไม่ดี เพราะจะ filter ทุกครั้งที่ fetch
  // const filteredCategories = categories.filter(
  //   (el) => el.type === categoryType
  // );

  if (notFoundError)
    return <h1 className="text-white">404 Transaction is not found</h1>;

  return (
    <>
      <div className="border bg-white rounded-2 p-3">
        <form className="row g-3" onSubmit={(event) => handleSubmitForm(event)}>
          <div className="col-6 ">
            <input
              type="radio"
              className="btn-check"
              id="cbx-expense"
              name="type"
              defaultChecked
              onChange={() => {
                setCategoryType(EXPENSE);
                setSelectedCategoryId(expenses[0].id);
              }}
            />
            <label
              className="btn btn-outline-danger rounded-0 rounded-start"
              htmlFor="cbx-expense"
            >
              Expense
            </label>
            <input
              type="radio"
              className="btn-check"
              id="cbx-income"
              name="type"
              onChange={() => {
                setCategoryType(INCOME);
                setSelectedCategoryId(incomes[0].id);
              }}
            />
            <label
              className="btn btn-outline-success rounded-0 rounded-end"
              htmlFor="cbx-income"
            >
              Income
            </label>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <i className="fa-solid fa-xmark" role="button"></i>
          </div>
          <div className="col-sm-6">
            <label htmlFor="" className="form-label">
              Payee
            </label>
            <input
              type="text"
              className={`form-control ${error.payee ? "is-invalid" : ""}`}
              value={payeeInput}
              onChange={(e) => setPayeeInput(e.target.value)}
            />
            {error.payee && (
              <div className="invalid-feedback">{error.payee}</div>
            )}
          </div>
          <div className="col-sm-6">
            <label htmlFor="" className="form-label">
              Category
            </label>
            <select
              name=""
              id=""
              className="form-select"
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              {(categoryType === EXPENSE ? expenses : incomes).map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-6">
            <label htmlFor="" className="form-label">
              Amount
            </label>
            <input
              type="text"
              className={`form-control  ${error.amount ? "is-invalid" : ""}`}
              value={amountInput}
              onChange={(e) => handleAmountOnchange(e.target.value)}
            />
            <div className="invalid-feedback">{error.amount}</div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="" className="form-label">
              Date
            </label>
            <input
              type="date"
              className={`form-control  ${error.date ? "is-invalid" : ""}`}
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <div className="invalid-feedback">{error.date}</div>
          </div>
          <div className="col-12 d-grid ">
            <button className="btn btn-primary mt-3" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      {params.transactionId && (
        <div className="d-grid mt-5">
          <button
            className="btn btn-danger"
            onClick={() => handleClickDelete()}
            disabled={loading}
          >
            Delete Transaction
          </button>
        </div>
      )}
    </>
  );
}

export default TransactionForm;

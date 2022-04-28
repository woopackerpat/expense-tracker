import "./App.css";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Home from "./pages/Home";
import TransactionAction from "./pages/TransactionAction";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Transaction from "./components/Transaction";
import { TransactionContextProvider } from "./contexts/TransactionContext";

function App() {
  return (
    <TransactionContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="new" element={<TransactionAction />} />
          <Route
            path="transaction/:transactionId"
            element={<TransactionAction />}
          ></Route>
          <Route index element = {<Navigate to = '/home'/>}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </TransactionContextProvider>
    // <Home />
    // <TransactionAction />
  );
}

export default App;

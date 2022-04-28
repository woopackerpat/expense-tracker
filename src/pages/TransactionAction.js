import TransactionForm from "../components/TransactionForm"
import {useParams} from 'react-router-dom'

function TransactionAction() {

  const params = useParams();
  console.log(params)
  return <TransactionForm />
       
}

export default TransactionAction
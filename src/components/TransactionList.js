import React from 'react'
import Transaction from './Transaction'

function TransactionList() {
  return (
    <ul className='list-group' >
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
    </ul>
  )
}

export default TransactionList
import React from 'react'
import Counter from '../../components/Counter/Counter'
import TopNav from '../../components/TopNav/TopNav'
import SideNav from '../../components/SideNav/SideNav'
import Amount from '../../components/Amount/Amount'
import './transaction.css'


function Transaction() {
  return (
    <div>
        <SideNav/>
        <TopNav/>
        <Amount/>
        <Counter/>
    </div>
  )
}

export default Transaction
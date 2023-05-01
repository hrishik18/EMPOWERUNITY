import './history.css'
import '../Transaction/transaction.css'
import React, { useEffect, useState } from 'react';
import TransPage from '../../components/TransPage/TransPage';
import SideNav from '../../components/SideNav/SideNav';
import TopNav from '../../components/TopNav/TopNav';

function History(props) {

  return (
    <div>
    <SideNav/>
    <TopNav/>
    <TransPage/>
</div>
  );
};

export default History;

import React from 'react'
import classes from './topnav.module.css'

function TopNav() {
  return (
    <div className={classes.navbar}>
    <div className={classes.name}>EmpowerUnity</div>
    <div className={classes.buttcontainer}>
       <div className={classes.box}>
           <button className={classes.button}>Sign Up</button>
       </div>
       <div className={classes.box}>
           <button className={classes.button}>Sign In</button>
       </div>
       </div>
   </div>
  )
}

export default TopNav
import React from 'react'
import './amount.css'

function Amount() {
  return (
    <div>
    <form>
  <input type="amount" placeholder="Amount"></input>
  <input type="submit" value="Donate"></input>
</form>
    </div>
  )
}

export default Amount
import React, { useEffect, useState } from 'react';
import './counter.css';

const Counter = ({divRefs}) => {
  const counters = [
    { icon: 'fa-clock', value: 15, text: 'Lac children impacted' },
    { icon: 'fas fa-users', value: 2000, text: 'Villages reached' },
    { icon: 'fa-ambulance', value: 400, text: 'Projects ' },
    { icon: 'fas fa-star', value: 25, text: 'States reached' },
  ];

  return (
    <div  className="wrapper-counter">
      {counters.map((counter) => (
        <CounterItem key={counter.text} {...counter} />
      ))}
    </div>
  );
};

const CounterItem = ({ icon, value, text }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const interval = 4000;

  useEffect(() => {
    const duration = Math.floor(interval / value);
    const counter = setInterval(() => {
      setDisplayValue((prevValue) => {
        if (prevValue < value) {
          return prevValue + 1;
        }
        clearInterval(counter);
        return prevValue;
      });
    }, duration);

    return () => clearInterval(counter);
  }, [value, interval]);

  return (
    <div className="container-counter">
      <i className={`fa ${icon}`}></i>
      <span className="num-counter">{displayValue}</span>
      <span className="text-counter">{text}</span>
    </div>
  );
};

export default Counter;
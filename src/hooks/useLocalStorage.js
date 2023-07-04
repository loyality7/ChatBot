import React from 'react';
import useLocalStorage from './useLocalStorage';

const MyComponent = () => {
  const [value, setValue, removeValue] = useLocalStorage('myKey', 'initialValue');

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleRemoveValue = () => {
    removeValue();
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleInputChange} />
      <button onClick={handleRemoveValue}>Remove Value</button>
    </div>
  );
};

export default MyComponent;

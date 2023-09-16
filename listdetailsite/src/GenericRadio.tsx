import React, { FC } from 'react';

export const GenericRadioComponent : FC<{
    contents: Array< {index: number; value: string;}>, 
    selectedValue: number, 
    onClick: () => void }
    > = 
     ({ selectedValue, onClick, contents}) => {

    const onChange = (inputValue: number ) => {
      selectedValue = inputValue
    }
  return (
    <div>
      
      <div className="mt-2">
        {contents.map((option: {index: number; value: string;}) => (
          <div key={option.value} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioGroup"
              id={`radio-${option.value}`}
              value={option.value}
              checked={option.index === selectedValue}
              onChange={() => onChange(option.index)}
            />
            <label className="form-check-label" htmlFor={`radio-${option.value}`}>
              {option.value}
            </label>
          </div>
        ))}
        <button className='btn btn-primary' onClick={onClick}>Submit</button>
      </div>
    </div>
  );
};

export default GenericRadioComponent;

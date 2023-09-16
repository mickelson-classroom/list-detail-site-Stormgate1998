import React, { FC } from 'react';

export interface Option {
  index: number;
  value: string;
}

export const GenericSelect: FC<{
  contents: {index: number, value: string}[];
  selectedValue: number;
  onChange: (value: number) => void;
}> = ({ selectedValue, onChange, contents }) => {
  return (
    <div>
      <select
        className="form-select"
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {contents.map((option) => (
          <option key={option.index} value={option.index}>
            {option.value}
          </option>
        ))}
      </select>
      <button className="btn btn-primary mt-2" onClick={() => onChange(selectedValue)}>
        Submit
      </button>
    </div>
  );
};

export default GenericSelect;

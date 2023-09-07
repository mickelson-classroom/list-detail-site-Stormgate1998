import React, { FC, useEffect, useState } from "react";

export const FilterInput: FC<{ onChange: (i: string) => void }> = ({
  onChange,
}) => {
  const [filterUserInput, setFilterUserInput] = useState("");

  useEffect(() => {
    onChange(filterUserInput);
  }, [filterUserInput]);
  return (
    <input className="form-control"
      value={filterUserInput}
      onChange={(e) => {
        setFilterUserInput(e.target.value);
      }}
    />
  );
};

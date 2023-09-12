import React, { FC, useEffect, useState } from "react";

export const ContentInput: FC<{ onChange: (i: string) => void }> = ({
  onChange,
}) => {
  const [contentUserInput, setContentUserInput] = useState("");
  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    onChange(contentUserInput);
  }, [contentUserInput]);

  const checkIsValid = () => {
    if (contentUserInput.length > 0 && contentUserInput !== '') {
      setIsValid(true)
    }
    else {
      setIsValid(false)
    }
  }
  return (
    <div className="form-check mb-3">
      <input className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
        value={contentUserInput}
        onChange={(e) => {
          setContentUserInput(e.target.value);
          checkIsValid()
        }}
        required />
      <div className="invalid-feedback">Please enter valid content</div>
      <div className="valid-feedback">This is valid content</div>
    </div>
  );
};

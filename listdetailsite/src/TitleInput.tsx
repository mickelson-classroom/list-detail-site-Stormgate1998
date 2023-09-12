import React, { FC, useEffect, useState } from "react";

export const TitleInput: FC<{ onChange: (i: string) => void }> = ({
  onChange,
}) => {
  const [titleInput, setTitleUserInput] = useState("");
  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    onChange(titleInput);
  }, [titleInput]);

  const checkIsValid = () =>{
    if (titleInput.length > 0 && titleInput !== ''){
      setIsValid(true)
     }
     else{
      setIsValid(false)
     }
  }
  return (
    <>
      <input className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
      
        value={titleInput}
        onChange={(e) => {
          setTitleUserInput(e.target.value);
          checkIsValid()
        }}
      />
      <div className="invalid-feedback">This is an invalid title</div>
      <div className="valid-feedback">That's a decent title</div>
    </>
  );
};

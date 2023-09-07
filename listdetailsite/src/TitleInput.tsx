import React, { FC, useEffect, useState } from "react";

export const TitleInput: FC<{ onChange: (i: string) => void }> = ({
  onChange,
}) => {
  const [titleInput, setTitleUserInput] = useState("");

  useEffect(() => {
    onChange(titleInput);
  }, [titleInput]);
  return (
    <input className="form-control"
      value={titleInput}
      onChange={(e) => {
        setTitleUserInput(e.target.value);
      }}
    />
  );
};

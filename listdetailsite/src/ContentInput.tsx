import React, { FC, useEffect, useState } from "react";

export const ContentInput: FC<{ onChange: (i: string) => void }> = ({
  onChange,
}) => {
  const [contentUserInput, setContentUserInput] = useState("");

  useEffect(() => {
    onChange(contentUserInput);
  }, [contentUserInput]);
  return (
    <input
      value={contentUserInput}
      onChange={(e) => {
        setContentUserInput(e.target.value);
      }}
    />
  );
};

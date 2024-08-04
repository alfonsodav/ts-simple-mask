import React from "react";
import createTsMask, { MaskOptions } from "ts-simple-mask";

const TsMask = createTsMask({
  rulesMoney: {
    thousands: ".",
    decimal: ",",
    precision: 2,
    allowNegative: true,
    beforeMask: (value) => (value === 1000 ? 1001 : value),
  },
  rulesMask: {
    map: new Map<string, MaskOptions>([["#", { pattern: /[A-Za-z]/ }]]),
    beforeMask: (value) => (value === "hello" ? "helloworld" : value),
    afterMask: (value) => (value.length > 10 ? value.slice(0, -1) : value),
  },
});

export const Input = () => {
  const [value, setValue] = React.useState("");
  const placeholder = TsMask.getPlaceholder("99-99-9999");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked } = TsMask.maskMoney(e.target.value);
    setValue(masked);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

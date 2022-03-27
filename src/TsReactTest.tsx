import React, { useState } from "react";
import { useMount } from "utils";

type Props = {};

const TsReactTest = (props: Props) => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "maya", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { name: string; age: number }, index: number) => (
        <div key={person.name} style={{ color: "red" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};

export default TsReactTest;

const useArray = <T,>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    add: (item: T): void => {
      setValue([...value, item]);
    },
    removeIndex: (index: number): void => {
      const copy = [...value];
      copy.splice(index, 0);
      setValue(copy);
    },
    clear: () => {
      setValue([]);
    },
  };
};

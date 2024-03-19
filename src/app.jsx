import { useState } from 'preact/hooks';
import { MultiSelect } from "react-multi-select-component";
import './app.css'

const options = [
  { label: "Akinya", value: "akinya" },
  { label: "John Doe", value: "john-doe" },
  { label: "kandel", value: "kandel-test", disabled: true },
];

export function App() {
  const [selected, setSelected] = useState([]);

  return (
    <>
     
      <div>
      <h1>Select Agents</h1>
      
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
     
    </>
  )
}

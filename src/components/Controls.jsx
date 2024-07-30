import AddButton from "./AddButton";
import colors from "../colors.json";
import Color from "./Color";

const Controls = () => {
  return (
    <div id="controls">
      <AddButton />
      {colors && colors.map((color) => <Color key={color.id} color={color} />)}
    </div>
  );
};

export default Controls;

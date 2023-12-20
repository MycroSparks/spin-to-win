import { useDispatch, useStore } from "react-redux";

export const Main: React.FC = () => {
  const store = useStore();
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: "coins/increment" })}>+</button>
      <button onClick={() => console.log(store.getState())}>=</button>
    </div>
  );
};

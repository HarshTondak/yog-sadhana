import { useMediaQuery } from "react-responsive";

export default function BatchSelect({ handleRegisterChange, batchError }) {
  // const view1 = useMediaQuery({
  //   query: "(min-width: 539px)",
  // });
  // const view2 = useMediaQuery({
  //   query: "(min-width: 850px)",
  // });
  const view3 = useMediaQuery({
    query: "(min-width: 1020px)",
  });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${batchError && !view3 ? "60px" : "0"}` }}
    >
      <label htmlFor="male">
        6-7AM
        <input
          type="radio"
          name="batch"
          id="6-7AM"
          value="6-7AM"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        7-8AM
        <input
          type="radio"
          name="batch"
          id="7-8AM"
          value="7-8AM"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        8-9AM
        <input
          type="radio"
          name="batch"
          id="8-9AM"
          value="8-9AM"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        5-6PM
        <input
          type="radio"
          name="batch"
          id="5-6PM"
          value="5-6PM"
          onChange={handleRegisterChange}
        />
      </label>
      {batchError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {batchError}
        </div>
      )}
    </div>
  );
}

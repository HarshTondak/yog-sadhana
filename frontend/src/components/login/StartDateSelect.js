import { useMediaQuery } from "react-responsive";

export default function StartDateSelect({
  sMonth,
  sYear,
  months,
  years,
  handleRegisterChange,
  startdateError,
}) {
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
      style={{ marginBottom: `${startdateError && !view3 ? "60px" : "0"}` }}
    >
      <select name="sMonth" value={sMonth} onChange={handleRegisterChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>

      <select name="sYear" value={sYear} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>

      {startdateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {startdateError}
        </div>
      )}
    </div>
  );
}

import { useSelector } from "react-redux";
import "./style.css";

export default function Intro() {
  const { user } = useSelector((state) => ({ ...state }));
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="profile_card">
      <div className="profile_card_header">Details</div>

      <button className="gray_btn hover1 w100">
        Full Name: {user.first_name.toUpperCase()}{" "}
        {user.last_name.toUpperCase()}
      </button>

      <button className="gray_btn hover1 w100">
        Date of Birth: {user.bDay} {monthsArray[user.bMonth - 1]}, {user.bYear}
      </button>

      <button className="gray_btn hover1 w100">
        Plan Activated for: {monthsArray[user.sMonth - 1]}, {user.sYear}
      </button>

      <button className="gray_btn hover1 w100">
        Batch Timing is: {user.batch}
      </button>
    </div>
  );
}

import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import StartDateSelect from "./StartDateSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import BatchSelect from "./BatchSelect";
import { loadStripe } from "@stripe/stripe-js";

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    sYear: new Date().getFullYear(),
    sMonth: new Date().getMonth() + 1,
    gender: "",
    batch: "",
  };
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    sYear,
    sMonth,
    gender,
    batch,
  } = user;

  const yearTemp = new Date().getFullYear();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // For Batch Start date
  const startyears = Array.from(new Array(5), (val, index) => yearTemp + index);
  const startmonths = Array.from(new Array(12), (val, index) => 1 + index);
  // For DOB
  const years = Array.from(new Array(75), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  // Password Validation
  // min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
  const passwordRules =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\[\]|]).{8,}$/;

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(8, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters")
      .matches(passwordRules, "Please create a stronger password"),
  });

  // For DOB
  const [dateError, setDateError] = useState("");
  // For batch start date
  const [startdateError, setStartDateError] = useState("");
  // For gender
  const [genderError, setGenderError] = useState("");
  // For batch slot
  const [batchError, setBatchError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`
      );

      const sessionId = response.data.id;

      // Handle payment success event
      if (sessionId) {
        await registerSubmit();

        const stripeCheckout = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
      }
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(`Payment initiation failed: ${error.message}`);
    }
  };

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          sMonth,
          sYear,
          batch,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);

      const { message, ...rest } = data;
      // The dispatch action
      dispatch({ type: "LOGIN", payload: rest });
      // Set user cookie
      Cookies.set("user", JSON.stringify(rest));
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            sMonth,
            sYear,
            batch,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);

            const atleast18 = new Date(
              picked_date.getFullYear() + 18,
              picked_date.getMonth(),
              picked_date.getDate()
            );
            const noMoreThan65 = new Date(
              picked_date.getFullYear() + 65,
              picked_date.getMonth(),
              picked_date.getDate()
            );

            if (current_date < atleast18) {
              console.log("less");
              setDateError("It looks like you've enetered the wrong DOB.");
              setGenderError("");
              setStartDateError("");
              setBatchError("");
            } else if (current_date > noMoreThan65) {
              console.log("more");
              setDateError("It looks like you've enetered the wrong DOB.");
              setGenderError("");
              setStartDateError("");
              setBatchError("");
            } else if (gender === "") {
              setDateError("");
              setGenderError("Please choose a gender.");
              setStartDateError("");
              setBatchError("");
            } else if (batch === "") {
              setDateError("");
              setGenderError("");
              setStartDateError("");
              setBatchError("Please choose a batch.");
            } else if (
              sYear === current_date.getFullYear() &&
              sMonth < current_date.getMonth() + 1
            ) {
              setDateError("");
              setGenderError("");
              setStartDateError(
                "Please choose either the current month or the upcoming months."
              );
              setBatchError("");
            } else {
              setDateError("");
              setGenderError("");
              setStartDateError("");
              setBatchError("");
              // Sending data to backend
              initiatePayment();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Select the Month <i className="info_icon"></i>
                </div>
                <StartDateSelect
                  sMonth={sMonth}
                  sYear={sYear}
                  months={startmonths}
                  years={startyears}
                  handleRegisterChange={handleRegisterChange}
                  startdateError={startdateError}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Batch <i className="info_icon"></i>
                </div>

                <BatchSelect
                  handleRegisterChange={handleRegisterChange}
                  batchError={batchError}
                />
              </div>

              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Join US!</button>
              </div>

              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { onChangeValidator, signUpFormValidator } from "../utils/validator";
import { getValueFromRef, getRadioCheckedValue } from "../utils/utilFunctions";
import Loader from "../components/loaderFullscreen/loader";
import AlertPopup from "../components/alerts/alertPopup";

const Signup = (props) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  //component specific props
  const [fullname, setFullname] = useState(null);
  const [password, setPassword] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [error, setError] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const removeErrorStyles = (ref) => {
    [
      "userFullname",
      "userSignUpId",
      "userDOB",
      "userGender",
      "userSignUpPassword",
      "userEmail",
    ].forEach((id) =>
      ref?.current
        ?.querySelector(`#${id}`)
        ?.classList?.remove("input-in-error-state")
    );
  };
  const processorFunc = (data) => {
    axios
      .post("https://stormy-cove-49326.herokuapp.com/app/signUpData", {
        ...data,
      })
      .then((response) => {
        if (response?.data?.message && response?.data?.message !== "") {
          setLoading(false);
          switch (response?.data?.message) {
            case "account_created":
              setSuccess(true);
              setAlert(`Your account is created. Please login now.`);
              break;
            case "mobile_already_used":
              setSuccess(false);
              setAlert(
                `Sorry, ${response?.data?.fullName}, this mobile number is already in use. Please use another mobile no.`
              );
              break;
            default:
              break;
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setAlert(e?.message || "Please try after sometime");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(formRef?.current?.checkValidity());
    if (formRef?.current?.checkValidity()) {
      const userFullname = getValueFromRef(formRef, "userFullname");
      const userSignUpId = getValueFromRef(formRef, "userSignUpId");
      const userDOB = getValueFromRef(formRef, "userDOB");
      const userGender = getRadioCheckedValue(formRef, "userGender");
      const userSignUpPassword = getValueFromRef(formRef, "userSignUpPassword");
      const userEmail = getValueFromRef(formRef, "userEmail");
      const allInputs = [
        userFullname,
        userSignUpId,
        userDOB,
        userGender,
        userSignUpPassword,
      ];
      //email is optional field
      if (userEmail && userEmail !== "") allInputs.push(userEmail);
      if (allInputs.every((i) => i && i !== "")) {
        setError(false);
        removeErrorStyles(formRef);
        const result = signUpFormValidator(
          userFullname,
          userSignUpId,
          userDOB,
          userGender,
          userSignUpPassword,
          userEmail
        );
        if (Object.values(result)?.every((val) => val)) {
          setLoading(true);
          processorFunc({
            fullName: `${userFullname}`,
            mobile: `${userSignUpId}`,
            password: `${userSignUpPassword}`,
            gender: `${userGender}`,
            dob: `${userDOB}`,
            email: `${userEmail || ""}`,
          });
          console.log(result);
        } else {
          setError(true);
          for (let eachKey in result) {
            if (!result[eachKey]) {
              formRef?.current
                .querySelector(`#${eachKey}`)
                .classList.add("input-in-error-state");
            }
          }
        }
      } else setError(true);
    }
  };

  useEffect(() => {
    if (!error && formRef) {
      removeErrorStyles(formRef);
    }
  }, [error, formRef]);

  const validator = (e) => {
    switch (e?.target.id) {
      case "userFullname":
        setFullname(e?.target.value);
        break;
      case "userSignUpPassword":
        setPassword(e?.target.value);
        break;
      case "userSignUpId":
        setMobile(e?.target.value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (fullname !== null) {
      if (onChangeValidator("fullname", fullname)) {
        setError(false);
        formRef?.current
          .querySelector(`#userFullname`)
          .classList.remove("input-in-error-state");
      } else {
        setError(true);
        formRef?.current
          .querySelector(`#userFullname`)
          .classList.add("input-in-error-state");
      }
    }
  }, [fullname]);

  useEffect(() => {
    if (password !== null) {
      if (onChangeValidator("password", password)) {
        setError(false);
        formRef?.current
          .querySelector(`#userSignUpPassword`)
          .classList.remove("input-in-error-state");
      } else {
        setError(true);
        formRef?.current
          .querySelector(`#userSignUpPassword`)
          .classList.add("input-in-error-state");
      }
    }
  }, [password]);

  useEffect(() => {
    if (mobile !== null) {
      if (onChangeValidator("mobile", mobile)) {
        setError(false);
        formRef?.current
          .querySelector(`#userSignUpId`)
          .classList.remove("input-in-error-state");
      } else {
        setError(true);
        formRef?.current
          .querySelector(`#userSignUpId`)
          .classList.add("input-in-error-state");
      }
    }
  }, [mobile]);

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        onReset={() => setError(false)}
      >
        <Form.Group className="m-3" controlId="userFullname">
          <Form.Control
            type="text"
            required
            placeholder="Enter your full name"
            onChange={validator}
          />
        </Form.Group>
        <Form.Group className="m-3" controlId="userSignUpId">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
            <Form.Control
              type="text"
              required
              placeholder="Enter your registered mobile number"
              onChange={validator}
            />
          </InputGroup>
          <Form.Text id="userSignUpIdHelpBlock" muted>
            Your mobile number must not have spaces and must have 10 digits.
          </Form.Text>
        </Form.Group>
        <Form.Group className="m-3" controlId="userDOB">
          <InputGroup>
            <InputGroup.Text id="basic-addon2">Date of Birth</InputGroup.Text>
            <Form.Control type="date" required />
          </InputGroup>
        </Form.Group>
        <Form.Group className="m-3" id="userGender">
          {["Male", "Female", "Other"].map((gender, idx) => (
            <Form.Check
              key={`${idx}`}
              required
              inline
              name="gender"
              type="radio"
              id={`${gender}`}
              label={`${gender}`}
              value={`${gender}`}
            />
          ))}
        </Form.Group>
        <Form.Group className="m-3" controlId="userSignUpPassword">
          <Form.Control
            type="password"
            required
            placeholder="Create a strong password"
            onChange={validator}
          />
          <Form.Text id="userSignUpPasswordHelpBlock" muted>
            Your password must be 8-20 characters long, contain only alphabets
            and numbers.
          </Form.Text>
        </Form.Group>
        <Form.Group className="m-3" controlId="userEmail">
          <Form.Control
            type="email"
            placeholder="Enter your email id (optional)"
          />
        </Form.Group>
        {error && (
          <div style={{ color: "red" }} className="m-3">
            Please correct the invalid inputs
          </div>
        )}
        <Form.Group className="m-1 p-2 border-top">
          <span className="me-1">Already have an account with us.</span>
          <NavLink to={"/login"}>Login now</NavLink>
        </Form.Group>
        <Button className="m-3" variant="primary" type="submit">
          Sign up
        </Button>
        <Button className="m-3" variant="secondary" type="reset">
          Reset
        </Button>
      </Form>
      <Loader show={loading} />
      {!!alert && (
        <AlertPopup
          show={!!alert}
          setShow={setAlert}
          closeButton={false}
          footerBtnOptions={{
            positiveBtnAction: success
              ? () => {
                  navigate("/login");
                }
              : () => {
                  setAlert(false);
                },
          }}
        >
          {alert}
        </AlertPopup>
      )}
    </>
  );
};

Signup.propTypes = {};

export default Signup;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { loginFormValidator } from "../utils/validator";
import { useUserInfoUpdate } from "../globalstate/context";
import openEye from "../assets/images/eye.svg";
import closeEye from "../assets/images/eye-closed.svg";
import Loader from "../components/loaderFullscreen/loader";
import AlertPopup from "../components/alerts/alertPopup";
import { onChangeValidator } from "../utils/validator";

const Login = ({}) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  //component specific props
  const navigate = useNavigate();

  const formRef = useRef();
  const [error, setError] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPwdOkay, setIsPwdOkay] = useState(false);
  const [isIdOkay, setIsIdOkay] = useState(false);

  const [hidePwd, setHidePwd] = useState(true);
  const updateUser = useUserInfoUpdate();

  const removeErrorStyles = (ref) => {
    ["userLoginId", "userLoginPassword", "userLoginConfirmPassword"].forEach(
      (id) =>
        ref?.current
          ?.querySelector(`#${id}`)
          ?.classList?.remove("input-in-error-state")
    );
  };

  const processorFunc = (data) => {
    axios
      .post("https://drc-reservations.onrender.com/app/loginData", {
        ...data,
      })
      .then((response) => {
        if (response?.data?.message && response?.data?.message !== "") {
          setLoading(false);
          switch (response?.data?.message) {
            case "admin_login_success":
              updateUser({
                name: response?.data?.adminName,
                adminId: response?.data?.adminId,
                isAdmin: true,
                isLoggedIn: true
              });
              navigate("/admindb");
              break;
            case "admin_incorrect_password":
              setAlert(
                `Sorry, ${response?.data?.adminName} \nPlease enter correct password`
              );
              break;
              //Normal user
            case "login_success":
              updateUser({
                name: response?.data?.fullName,
                loginId: response?.data?.mobile,
                isLoggedIn: true,
              });
              navigate("/dashboard");
              break;
            case "incorrect_password":
              setAlert(
                `Sorry, ${response?.data?.fullName} \nPlease enter correct password`
              );
              break;
            case "incorrect_mobile_no":
              setAlert(
                "Sorry, you do not have an account with this mobile number"
              );
              break;

            default:
              break;
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setAlert(e?.message || `Server issue`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form?.checkValidity()) {
      const userLoginId = form?.querySelector("#userLoginId")?.value?.trim();
      const userLoginPassword = form
        ?.querySelector("#userLoginPassword")
        ?.value?.trim();

      if (
        userLoginId &&
        userLoginPassword &&
        userLoginId !== "" &&
        userLoginPassword !== ""
      ) {
        const result = loginFormValidator(userLoginId, userLoginPassword);
        if (result?.loginId && result?.password) {
          setLoading(true);
          processorFunc({
            loginId: userLoginId,
            loginPassword: userLoginPassword,
          });
        } else if (!result?.loginId && result?.password) {
          alert("Please enter registered mobile number");
        } else if (result?.loginId && !result?.password) {
          alert("Please provide valid password");
        } else alert("Please provide valid inputs only");
      }
    }
  };
  const resetFunc = () => {
    setError(false);
    setHidePwd(true);
    setLoginId(null);
    setPassword(null);
    setIsPwdOkay(false);
    setIsIdOkay(false);
  };

  useEffect(() => {
    if (loginId !== null) {
      if (onChangeValidator("mobile", loginId)) {
        setIsIdOkay(true);
        formRef?.current
          .querySelector(`#userLoginId`)
          .classList.remove("input-in-error-state");
      } else {
        setIsIdOkay(false);
        setError(true);
        formRef?.current
          .querySelector(`#userLoginId`)
          .classList.add("input-in-error-state");
      }
    }
  }, [loginId]);

  useEffect(() => {
    if (password !== null) {
      if (onChangeValidator("password", password)) {
        setIsPwdOkay(true);
        formRef?.current
          .querySelector(`#userLoginPassword`)
          .classList.remove("input-in-error-state");
      } else {
        setError(true);
        setIsPwdOkay(false);
        formRef?.current
          .querySelector(`#userLoginPassword`)
          .classList.add("input-in-error-state");
      }
    }
  }, [password]);

  useEffect(() => {
    if (!error && isIdOkay && isPwdOkay && formRef) {
      formRef.current.querySelector("#submitBtn").disabled = false;
      removeErrorStyles(formRef);
    } else formRef.current.querySelector("#submitBtn").disabled = true;
  }, [error, isIdOkay, isPwdOkay, formRef]);

  useEffect(() => {
    if (isIdOkay && isPwdOkay) setError(false);
  }, [isIdOkay, isPwdOkay]);

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit} onReset={resetFunc}>
        <Form.Group className="m-3" controlId="userLoginId">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
            <Form.Control
              autoFocus
              type="text"
              required
              placeholder="Registered mobile number"
              onChange={(e) => setLoginId(e.target.value)}
            />
          </InputGroup>
          <Form.Text id="userLoginIdHelpBlock" muted>
            Your mobile number must not have spaces and must have 10 digits.
          </Form.Text>
        </Form.Group>

        <Form.Group className="m-3" controlId="userLoginPassword">
          <InputGroup>
            <Form.Control
              type={hidePwd ? "password" : "text"}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={() => setHidePwd((hidePwd) => !hidePwd)}>
              <img
                src={hidePwd ? openEye : closeEye}
                width="24"
                title={hidePwd ? "show" : "hide"}
              />
            </Button>
          </InputGroup>
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain only alphabets
            and numbers.
          </Form.Text>
        </Form.Group>
        {/* Inputs end here */}
        <Form.Group className="m-2 p-1 border-top">
          <span className="me-1">Forgot password,</span>
          <NavLink to={"/resetpwd"}>reset now</NavLink>
        </Form.Group>
        <Form.Group className="mx-2">
          <span className="ms-1 me-1">Don't have an account with us.</span>
          <NavLink to={"/signup"}>Create one now</NavLink>
        </Form.Group>
        <Button id="submitBtn" className="m-3" variant="primary" type="submit">
          Login
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
            positiveBtnAction: () => {
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

Login.propTypes = {};

export default Login;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { loginFormValidator, onChangeValidator } from "../utils/validator";
import { useBackendUrlDomain, useUserInfoUpdate } from "../globalstate/context";
import greentick from "../assets/images/green-tick.png";
import openEye from "../assets/images/eye.svg";
import closeEye from "../assets/images/eye-closed.svg";
import AlertPopup from "../components/alerts/alertPopup";
import Loader from "../components/loaderFullscreen/loader";

const ResetPassword = ({}) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  //component specific props
  const navigate = useNavigate();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [hidePwd, setHidePwd] = useState(true);
  const [loginId, setLoginId] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPwd, setConfirmPwd] = useState(null);
  const [isPwdOkay, setIsPwdOkay] = useState(false);
  const [isIdOkay, setIsIdOkay] = useState(false);
  const BACKEND_URL_DOMAIN = useBackendUrlDomain();
  const apiEndpoint = `${BACKEND_URL_DOMAIN}/app/resetpasscode`;
  // const updateUserName = useUserInfoUpdate();
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
      .post(apiEndpoint, {
        ...data,
      })
      .then((response) => {
        if (response?.data?.message && response?.data?.message !== "") {
          setLoading(false);
          switch (response?.data?.message) {
            case "password_changed":
              setSuccess(true);
              setAlert(`Your password has been changed. Please login now`);
              break;
            case "same_password":
              setSuccess(false);
              setAlert(`Sorry, you have entered the same password`);
              break;
            case "user_not_found":
              setSuccess(false);
              setAlert("User not found");
              break;
            case "unknown_error":
              setSuccess(false);
              setAlert(
                "Sorry, there is some issue. Please try again after sometime"
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
      const userLoginConfirmPassword = form
        ?.querySelector("#userLoginConfirmPassword")
        ?.value?.trim();

      if (
        userLoginId &&
        userLoginPassword &&
        userLoginConfirmPassword &&
        userLoginId !== "" &&
        userLoginPassword !== "" &&
        userLoginConfirmPassword !== ""
      ) {
        const result = loginFormValidator(userLoginId, userLoginPassword);
        if (result?.loginId && result?.password) {
          setLoading(true);
          processorFunc({
            loginId: userLoginId,
            password: userLoginPassword,
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
    setConfirmPwd(null);
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
        formRef?.current
          .querySelector(`#userLoginPassword`)
          .classList.remove("input-in-error-state");
      } else {
        setError(true);
        formRef?.current
          .querySelector(`#userLoginPassword`)
          .classList.add("input-in-error-state");
      }
    }
  }, [password]);

  useEffect(() => {
    if (confirmPwd !== null && password === confirmPwd) {
      formRef?.current
        .querySelector(`#passwordMatchId`)
        .classList.remove("hide-me");
    } else {
      setError(true);
      formRef?.current
        .querySelector(`#passwordMatchId`)
        .classList.add("hide-me");
    }
    if (
      onChangeValidator("password", password) &&
      confirmPwd !== null &&
      password === confirmPwd
    ) {
      setIsPwdOkay(true);
    } else setIsPwdOkay(false);
  }, [password, confirmPwd]);

  useEffect(() => {
    if (!error && isIdOkay && isPwdOkay && formRef) {
      formRef.current.querySelector("#submitBtn").disabled = false;
      removeErrorStyles(formRef);
    } else formRef.current.querySelector("#submitBtn").disabled = true;
  }, [error, formRef]);

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
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="Registered mobile number"
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button
              variant="info"
              onClick={() => setHidePwd((hidePwd) => !hidePwd)}
            >
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
        <Form.Group className="m-3" controlId="userLoginConfirmPassword">
          <Form.Control
            type="text"
            onChange={(e) => setConfirmPwd(e.target.value)}
            required
            placeholder="Confirm password"
          />
          <Form.Text id="passwordMatchId" className="text-success">
            <img width="24" className="m-1" src={greentick} alt="" />
            <span>Passwords match</span>
          </Form.Text>
        </Form.Group>
        {/* Inputs end here */}

        <Button id="submitBtn" className="m-3" variant="primary" type="submit">
          Change Password
        </Button>
        <Button className="m-3" variant="secondary" type="reset">
          Reset inputs
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

export default ResetPassword;

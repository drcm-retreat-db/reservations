import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useUserInfo } from "../globalstate/context";
import { useNavigate } from "react-router-dom";
import JumbotronComponent from "../components/jumbotron/jumbotronComponent";
import MultiStageForm from "../components/multiStageForm/multiStageForm";
import ReviewDetails from "../components/reviewDetails/reviewDetails";
import Loader from "../components/loaderFullscreen/loader";
import AlertPopup from "../components/alerts/alertPopup";

const Dashboard = (props) => {
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  //component specific props
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOptions, setModalOptions] = useState({});
  const userInfo = useUserInfo();
  const navigate = useNavigate();

  const onFormPost = (data) => {
    setShow(false);
    setLoading(true);
    axios
      .post("https://stormy-cove-49326.herokuapp.com/app/createapp", {
        ...data,
        bookedBy: userInfo?.loginId,
      })
      .then((response) => {
        if (response?.data?.message && response?.data?.message !== "") {
          setLoading(false);
          switch (response?.data?.message) {
            case "form_submitted":
              setSuccess(true);
              setAlert(`form submitted: ${response.data.reqId}`);
              break;
            case "form_not_submitted":
              setSuccess(false);
              setAlert(`FAILED: ${response.data.message}`);
              break;
            default:
              setSuccess(false);
              setAlert(`Sorry, Please try after sometime`);
              break;
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setAlert(e?.message || `Server issue`);
      });
  };

  const onReviewFunc = (dataObj) => {
    if (dataObj) {
      setModalOptions({
        title: "Review details",
        footerBtnOptions: {
          positiveBtnLabel: "Submit",
          negativeBtnLabel: "Go back",
          negativeBtnAction: () => setShow(false),
        },
        dataObj,
      });
    } else {
      setModalOptions({
        title: "Oops!",
        footerBtnOptions: {
          positiveBtnLabel: "okay!",
          positiveBtnAction: () => setShow(false),
        },
        dataObj: null,
      });
    }
    //review modal open
    setShow(true);
  };

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) navigate("/login");
  }, [userInfo]);
  return (
    <article style={{ padding: "1rem 0" }}>
      <JumbotronComponent
        variant="success"
        heading={`Welcome ${userInfo?.name || ""}`}
      >
        You can now access this website effectively!
      </JumbotronComponent>
      <MultiStageForm onSubmit={onReviewFunc} />
      <ReviewDetails {...{ modalOptions, show, setShow, onFormPost }} />
      <Loader loaderType="Infinity" show={loading} />
      {!!alert && (
        <AlertPopup
          show={!!alert}
          setShow={setAlert}
          closeButton={false}
          footerBtnOptions={{
            positiveBtnAction: success
              ? () => {
                  navigate("/");
                }
              : () => {
                  setAlert(false);
                },
          }}
        >
          {alert}
        </AlertPopup>
      )}
    </article>
  );
};

Dashboard.propTypes = {};

export default Dashboard;

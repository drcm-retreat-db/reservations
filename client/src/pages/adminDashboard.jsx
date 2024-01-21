import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import { useBackendUrlDomain, useUserInfo } from "../globalstate/context";
import { useNavigate } from "react-router-dom";
import JumbotronComponent from "../components/jumbotron/jumbotronComponent";
import AccordionComponent from "../components/accordion/accordion";
import Loader from "../components/loaderFullscreen/loader";
// import { CSVLink } from "react-csv";
import Button from "react-bootstrap/esm/Button";

const AdminDashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [currenTab, setCurrentTab] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [seekerData, setSeekerData] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [combinedArr, setCombinedArr] = useState([]);
  const userInfo = useUserInfo();
  const BACKEND_URL_DOMAIN = useBackendUrlDomain();
  const apiEndpoint = `${BACKEND_URL_DOMAIN}/app/getallrequests`;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.isAdmin) navigate("/");
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.adminId) {
      axios
        .post(apiEndpoint, {
          loginId: userInfo.adminId,
        })
        .then((response) => {
          if (response.data && response?.data?.message !== "no_admin_rights") {
            setLoading(false);
            setReqData(response.data);
          } else {
            setLoading(false);
            alert("please try after sometime");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [userInfo]);

  useEffect(() => {
    if (reqData) {
      const { seekerReqs, providerReqs } = reqData;
      if (seekerReqs?.length > 0 || providerReqs?.length > 0) {
        setSeekerData({
          filename: "seekers.csv",
          data: seekerReqs,
          headers: getCsvHeaders("seeker"),
        });
        setProviderData({
          filename: "providers.csv",
          data: providerReqs,
          headers: getCsvHeaders("provider"),
        });
        setCombinedArr([...seekerReqs, ...providerReqs]);
      }
    }
  }, [reqData]);

  const getCsvHeaders = (field) => {
    const { seekerReqs, providerReqs } = reqData;
    if (field === "seeker") {
      const seekerHeaders = Object.keys(seekerReqs[0]);
      return [...seekerHeaders]?.map((header) => ({
        label: header.toUpperCase(),
        key: header,
      }));
    }
    if (field === "provider") {
      const providerHeaders = Object.keys(providerReqs[0]);
      return [...providerHeaders]?.map((header) => ({
        label: header.toUpperCase(),
        key: header,
      }));
    }
  };

  return (
    <article style={{ padding: "1rem 0" }}>
      <JumbotronComponent
        variant="success"
        heading={`Welcome ${userInfo?.name}`}
      >
        You are in Admin dashboard
      </JumbotronComponent>
      <Stack direction="horizontal" style={{ margin: "1rem 0" }} gap={4}>
        <Button variant="success" onClick={() => { setCurrentTab("VIEW_ROOMS") }}>
          View room availabilty
        </Button>
        <Button variant="success" onClick={() => { setCurrentTab("BOOKING") }}>
          View booking requests
        </Button>
        <Button variant="warning" onClick={() => { setCurrentTab("EDIT_ROOMS") }}>
          Edit Rooms
        </Button>
      </Stack>
      <JumbotronComponent>
        <div style={{minHeight: "50vh"}}>
          {currenTab === "BOOKING" && <AccordionComponent
            headersProp={["Unapproved requests", "Approved requests"]}
            rawData={combinedArr}
          />}
        </div>
      </JumbotronComponent>
      <Loader loaderType="Spinner" show={loading} />
    </article>
  );
};

AdminDashboard.propTypes = {};

export default AdminDashboard;


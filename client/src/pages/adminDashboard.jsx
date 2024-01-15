import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import { useBackendUrlDomain, useUserInfo } from "../globalstate/context";
import { useNavigate } from "react-router-dom";
import JumbotronComponent from "../components/jumbotron/jumbotronComponent";
import AccordionComponent from "../components/accordion/accordion";
import Loader from "../components/loaderFullscreen/loader";
import { CSVLink } from "react-csv";

const AdminDashboard = (props) => {
  const [loading, setLoading] = useState(false);
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
        heading={`Welcome ${userInfo?.name} (admin)`}
      >
        You are now in Admin dashboard
      </JumbotronComponent>
      <Stack direction="horizontal" style={{ margin: "1rem 0" }} gap={3}>
        {seekerData && (
          <CSVLink
            {...seekerData}
            className="mx-auto mx-md-0 ms-md-auto btn btn-outline-success"
          >
            {getSpreadSheetIcon()}
            Download seeker data
          </CSVLink>
        )}
        {providerData && (
          <CSVLink
            {...providerData}
            className="mx-auto mx-md-0 btn btn-outline-success"
          >
            {getSpreadSheetIcon()}
            Download provider data
          </CSVLink>
        )}
      </Stack>
      <AccordionComponent
        headersProp={["Seekers", "Providers"]}
        rawData={combinedArr}
      />
      <Loader loaderType="Spinner" show={loading} />
    </article>
  );
};

AdminDashboard.propTypes = {};

export default AdminDashboard;

function getSpreadSheetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-file-earmark-spreadsheet"
      viewBox="0 0 20 20"
    >
      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
    </svg>
  );
}

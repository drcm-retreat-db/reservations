import React, { useEffect, useState } from "react";
import Modal from "../modal/modal";
import PrintView from "../printView/printView";

const ReviewDetails = ({ modalOptions, show, setShow, onFormPost }) => {
  const { title, dataObj, footerBtnOptions } = modalOptions || {};
  const [modalBody, setModalBody] = useState("");
  const [finalObj, setFinalObj] = useState({});

  useEffect(() => {
    if (dataObj && typeof dataObj === "object") {
      setModalBody(<PrintView dataObj={dataObj} />);
      setFinalObj(() => {
        if (dataObj.jobType === "seeker") {
          return {
            applicationType: dataObj.jobType,
            applicantName: dataObj.appName,
            applicantMobile: dataObj.appMobile,
            age: dataObj.seekerAge,
            address: dataObj.seekerAddress,
            qualification: dataObj.seekerQualification,
            preferenceOne: dataObj.seekerPreferenceOne,
            preferenceTwo: dataObj.seekerPreferenceTwo,
            // bookedBy: dataObj.appMobile,
          };
        }
        if (dataObj.jobType === "provider") {
          return {
            applicationType: dataObj.jobType,
            applicantName: dataObj.appName,
            applicantMobile: dataObj.appMobile,
            companyDetails: dataObj.providerAddress,
            vacancyCount: dataObj.vacancyCount,
            workDetails: dataObj.workDetails,
            qualifications: dataObj.providerQualifications,
            // bookedBy: dataObj.appMobile,
          };
        }
      });
    }
  }, [dataObj]);
  
  return (
    <Modal
      modalTitle={title}
      footerBtnOptions={{...footerBtnOptions,positiveBtnAction:()=>onFormPost(finalObj)}}
      show={show}
      setShow={setShow}
      scrollable
      centered
    >
      {modalBody}
    </Modal>
  );
};

export default ReviewDetails;

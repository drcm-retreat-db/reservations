import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MMDDYYYYConverter } from "../../utils/utilFunctions";
import Card from "../cards/card";

const AccordionComponent = ({ headersProp, rawData }) => {
  const [dataArray, setDataArray] = useState(null);
  const [accordionBodyArr, setAccordionBodyArr] = useState(null);
  useEffect(() => {
    if (Array.isArray(headersProp) && headersProp.length > 0) {
      setDataArray(headersProp);
    }
  }, [headersProp]);

  useEffect(() => {
    if (rawData && rawData.length > 0) {
      setAccordionBodyArr(
        rawData.map((application) => {
          if (application?.applicationType === "seeker") {
            return {
              _type: "Seekers",
              title: application?.applicantName,
              subtitle: application?.requestId,
              additionalContent: (
                <div>
                  <p>Contact: {application?.applicantMobile}</p>
                  <p>Qualification: {application?.qualification}</p>
                  <p>Submitted on: {MMDDYYYYConverter(application?.date)}</p>
                </div>
              ),
            };
          }
          if (application?.applicationType === "provider") {
            return {
              _type: "Providers",
              title: application?.applicantName,
              subtitle: application?.requestId,
              additionalContent: (
                <div>
                  <p>Contact: {application?.applicantMobile}</p>
                  <p>
                    Qualifications: {application?.qualifications?.join(",")}
                  </p>
                  <p>Vacancy: {application?.vacancyCount}</p>
                  <p>Company details: {application?.companyDetails}</p>
                  <p>Submitted on: {MMDDYYYYConverter(application?.date)}</p>
                </div>
              ),
            };
          }
        })
      );
    }
  }, [rawData]);

  return (
    <Accordion>
      {/* Accordion rendering based on array prop */}
      {dataArray &&
        dataArray.map((header, idx) => (
          <Accordion.Item eventKey={`${idx}`} key={`${idx}`}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Body>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {accordionBodyArr && accordionBodyArr.map((item, idx) => {
                  if (item?._type === header)
                    return <Card key={`${idx}`} {...item} />;
                })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  );
};

export default AccordionComponent;

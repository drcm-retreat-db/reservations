import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getRadioCheckedValue } from "../../utils/utilFunctions";
import { multiStageFormValidator } from "../../utils/validator";
import jobData from "../../utils/static/jobs.json";
import qualificationData from "../../utils/static/qualifications.json";
import InputGroupWithFeedback from "../formInputs/inputGroupWithFeedback";

const MultiStageForm = ({ onSubmit = () => {} }) => {
  const formRef = useRef(null);
  const [stage, setStage] = useState(1);
  const [jobType, setJobType] = useState("");
  const [initJobs, setInitJobs] = useState([...(jobData.jobs || [])]);
  const [commonInfo, setCommonInfo] = useState({});
  const [seekerInfo, setSeekerInfo] = useState({});
  const [providerInfo, setProviderInfo] = useState({});

  const decrementer = () => setStage((prevState) => prevState - 1);
  const incrementer = () => setStage((prevState) => prevState + 1);

  const validatorFunc = (event) => {
    const { id, val } = { id: event.target.id, val: event.target.value };
    switch (id) {
      //common section
      case "appName":
        setCommonInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      case "appMobile":
        setCommonInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      //stage 2 -seeker
      case "seekerAge":
        setSeekerInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      case "seekerAddress":
        setSeekerInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      //stage 2 -provider
      case "providerAddress":
        setProviderInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      // case "providerEmail":
      //   setProviderInfo((prev) => {
      //     return { ...prev, [id]: val };
      //   });
      //   break;
      //stage 3 -seeker
      case "seekerQualification":
        setSeekerInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      case "seekerPreferenceOne":
        setSeekerInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      case "seekerPreferenceTwo":
        setSeekerInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      //stage 3 -provider
      case "providerQualifications":
        setProviderInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      case "vacancyCount":
        setProviderInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;
      case "workDetails":
        setProviderInfo((prev) => {
          return { ...prev, [id]: val };
        });
        break;

      default:
        break;
    }

    if (!multiStageFormValidator(id, val)) {
      formRef.current
        .querySelector(`#${id}`)
        .style.setProperty("background", "transparent", "important");
      formRef.current.querySelector(`#${id}Helper`).style.color = "red";
      formRef.current.querySelector(`#${id}Helper`).innerHTML =
        "Please give valid input";
    } else {
      formRef.current
        .querySelector(`#${id}`)
        .style.setProperty("background", "#90ee90a8", "important");
      formRef.current.querySelector(`#${id}Helper`).innerHTML = "";
    }
  };
  const applicationFormSubmitter = (e) => {
    e.preventDefault();
    const specificData = jobType === "seeker" ? seekerInfo : providerInfo;
    if (
      jobType &&
      Object.keys(commonInfo).every((key) =>
        multiStageFormValidator(key, commonInfo[key])
      ) &&
      Object.keys(specificData).every((key) =>
        multiStageFormValidator(key, specificData[key])
      )
    ) {
      const appData = {
        jobType,
        ...commonInfo,
        ...specificData,
        checked: formRef?.current?.querySelector("#agreeTerms")?.checked,
      };
      if (appData.checked) {
        formRef.current.querySelector("#agreeTermsHelper").textContent =""
        onSubmit(appData);
      } else{
        formRef.current.querySelector("#agreeTermsHelper").textContent = "please check to proceed"
      }
    }
  };

  useEffect(() => {
    setSeekerInfo({});
    setProviderInfo({});
  }, [jobType]);

  useEffect(() => {
    if (stage === 1) {
      if (jobType !== "") {
        formRef.current.querySelector("#multiStageSuccessBtn").style.display =
          "block";
      } else
        formRef.current.querySelector("#multiStageSuccessBtn").style.display =
          "none";
    }
    if (stage === 2) {
      if (jobType === "seeker") {
        if (
          Object.keys(commonInfo).length === 2 &&
          Object.keys(seekerInfo).length >= 2 &&
          Object.keys(commonInfo).every((key) =>
            multiStageFormValidator(key, commonInfo[key])
          ) &&
          multiStageFormValidator("seekerAge", seekerInfo?.seekerAge) &&
          multiStageFormValidator("seekerAddress", seekerInfo?.seekerAddress)
        ) {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "block";
        } else {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "none";
        }
      }
      if (jobType === "provider") {
        if (
          Object.keys(commonInfo).length === 2 &&
          Object.keys(providerInfo).length >= 1 &&
          Object.keys(commonInfo).every((key) =>
            multiStageFormValidator(key, commonInfo[key])
          ) &&
          multiStageFormValidator(
            "providerAddress",
            providerInfo?.providerAddress
          )
        ) {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "block";
        } else {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "none";
        }
      }
    }

    if (stage === 3) {
      if (jobType === "seeker") {
        if (
          Object.keys(commonInfo).length === 2 &&
          Object.keys(seekerInfo).length === 5 &&
          Object.keys(commonInfo).every((key) =>
            multiStageFormValidator(key, commonInfo[key])
          ) &&
          Object.keys(seekerInfo).every((key) =>
            multiStageFormValidator(key, seekerInfo[key])
          )
        ) {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "block";
        } else {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "none";
        }
      }
      if (jobType === "provider") {
        if (
          Object.keys(commonInfo).length === 2 &&
          Object.keys(providerInfo).length === 4 &&
          Object.keys(commonInfo).every((key) =>
            multiStageFormValidator(key, commonInfo[key])
          ) &&
          Object.keys(providerInfo).every((key) =>
            multiStageFormValidator(key, providerInfo[key])
          )
        ) {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "block";
        } else {
          formRef.current.querySelector("#multiStageSuccessBtn").style.display =
            "none";
        }
      }
    }
  }, [jobType, stage, commonInfo, seekerInfo, providerInfo]);

  const stageOneContent = () => {
    return (
      <>
        <Form.Group className="m-2" id="applicationType">
          <Form.Label className="d-block d-lg-inline-block me-lg-5">
            I am a
          </Form.Label>
          {["seeker", "provider"].map((applicationType, idx) => (
            <Form.Check
              key={`${idx}`}
              inline
              name="applicationType"
              type="radio"
              id={`${applicationType}`}
              label={`Job ${applicationType}`}
              value={`${applicationType}`}
              onClick={() =>
                setJobType(getRadioCheckedValue(formRef, "applicationType"))
              }
            />
          ))}
        </Form.Group>
      </>
    );
  };
  const stageTwoContent = () => {
    return (
      <>
        <InputGroupWithFeedback
          controlId="appName"
          labelText="Name"
          placeholder="Please spell your name correctly"
          onChange={(e) => validatorFunc(e)}
        />
        {jobType === "provider" && jobProviderSpecific()}
        {jobType === "seeker" && jobSeekerSpecific()}
        <InputGroupWithFeedback
          controlId="appMobile"
          labelText="+91"
          placeholder="Whatsapp mobile number"
          onChange={(e) => validatorFunc(e)}
        />
      </>
    );

    function jobProviderSpecific() {
      return (
        <>
          <Form.Group className="my-3" controlId="providerAddress">
            <Form.Control
              type="text"
              placeholder="Company name &amp; address"
              onChange={(e) => validatorFunc(e)}
            />
            <Form.Text id={`providerAddressHelper`}></Form.Text>
          </Form.Group>
          {/* <InputGroupWithFeedback
            controlId="providerEmail"
            labelText="Company email"
            type="email"
            placeholder="abc@example.com"
            onChange={(e) => {}}
          /> */}
        </>
      );
    }
    function jobSeekerSpecific() {
      return (
        <>
          <InputGroupWithFeedback
            controlId="seekerAge"
            labelText="Age"
            type="number"
            placeholder="Your age must be above 14 years"
            onChange={(e) => validatorFunc(e)}
          />
          <InputGroupWithFeedback
            controlId="seekerAddress"
            labelText="Address"
            placeholder="house no, street name, area, city"
            onChange={(e) => validatorFunc(e)}
          />
        </>
      );
    }
  };
  const stageThreeContent = () => {
    return (
      <>
        {jobType === "provider" && jobProvider()}
        {jobType === "seeker" && jobSeeker()}
        <Form.Group className="my-3">
          <Form.Check
            required
            type="checkbox"
            id="agreeTerms"
            label={`I agree to provide these information`}
          />
          <Form.Text id={`agreeTermsHelper`} style={{color:"red"}} ></Form.Text>
        </Form.Group>
      </>
    );

    function jobProvider() {
      return (
        <>
          <Form.Group
            className="p-2"
            style={{ borderRadius: "0.5rem" }}
            id="providerQualifications"
            onChange={(e) =>
              validatorFunc({
                target: {
                  id: "providerQualifications",
                  value: getRadioCheckedValue(
                    formRef,
                    "providerQualifications",
                    "checkbox"
                  ),
                },
              })
            }
          >
            <Form.Label className="d-block">
              Expected employee qualifications
            </Form.Label>
            {qualificationData?.qualifications?.map((qualification, idx) => (
              <Form.Check
                key={`${idx}`}
                name={`${qualification}`}
                type="checkbox"
                id={`${qualification}`}
                label={`${qualification}`}
              />
            ))}
            <Form.Text id={`providerQualificationsHelper`}></Form.Text>
          </Form.Group>
          <InputGroupWithFeedback
            controlId="vacancyCount"
            labelText="No. of employees needed"
            type="number"
            onChange={(e) => validatorFunc(e)}
          />
          <Form.Group className="my-3" controlId="workDetails">
            <Form.Label>Nature of work and salary details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => validatorFunc(e)}
            />
            <Form.Text id={`workDetailsHelper`}></Form.Text>
          </Form.Group>
        </>
      );
    }

    function jobSeeker() {
      return (
        <>
          <Form.Group
            className="p-2"
            style={{ borderRadius: "0.5rem" }}
            id="seekerQualification"
            onChange={(e) =>
              validatorFunc({
                target: { id: "seekerQualification", value: e.target.value },
              })
            }
          >
            <Form.Label className="d-block">
              Your Highest Qualification
            </Form.Label>
            {qualificationData?.qualifications?.map((qualification, idx) => (
              <Form.Check
                key={`${idx}`}
                name="qualification"
                type="radio"
                id={`${qualification}`}
                label={`${qualification}`}
                value={`${qualification}`}
              />
            ))}
            <Form.Text id={`seekerQualificationHelper`}></Form.Text>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Select
              id="seekerPreferenceOne"
              onChange={(e) => validatorFunc(e)}
            >
              <option>Job Preference 1</option>
              {initJobs
                ?.filter((i) => i !== (seekerInfo?.seekerPreferenceTwo || ""))
                ?.map((job, idx) => (
                  <option key={idx} value={job}>
                    {job}
                  </option>
                ))}
            </Form.Select>
            <Form.Text id={`seekerPreferenceOneHelper`}></Form.Text>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Select
              id="seekerPreferenceTwo"
              onChange={(e) => validatorFunc(e)}
            >
              <option>Job Preference 2</option>
              {initJobs
                ?.filter((i) => i !== (seekerInfo?.seekerPreferenceOne || ""))
                ?.map((job, idx) => (
                  <option key={idx} value={job}>
                    {job}
                  </option>
                ))}
            </Form.Select>
            <Form.Text id={`seekerPreferenceTwoHelper`}></Form.Text>
          </Form.Group>
        </>
      );
    }
  };

  return (
    <>
      <Card className="mx-lg-5">
        <Card.Header className="text-center">
          <Card.Title>Employment Welfare Application</Card.Title>
          <ProgressBar
            animated={stage > 2 ? false : true}
            now={stage}
            variant={stage > 2 ? "success" : "info"}
            min={0}
            max={3}
          />
        </Card.Header>
        <Card.Body>
          <Form ref={formRef}>
            {
              <div className={`${stage !== 1 ? "d-none" : "d-block"}`}>
                {stageOneContent()}
              </div>
            }
            {
              <div className={`${stage !== 2 ? "d-none" : "d-block"}`}>
                {stageTwoContent()}
              </div>
            }
            {
              <div className={`${stage !== 3 ? "d-none" : "d-block"}`}>
                {stageThreeContent()}
              </div>
            }
            <Stack direction="horizontal">
              {stage >= 2 && (
                <Button variant="info" onClick={decrementer}>
                  Prev
                </Button>
              )}
              <Button
                className="ms-auto"
                variant="success"
                type="button"
                id="multiStageSuccessBtn"
                onClick={stage !== 3 ? incrementer : applicationFormSubmitter}
              >
                {stage !== 3 ? "Next" : "Review"}
              </Button>
            </Stack>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center text-secondary">
          Please provide true and valid Inputs only
        </Card.Footer>
      </Card>
    </>
  );
};

export default MultiStageForm;

import qualificationData from "./static/qualifications.json";
import jobsData from "./static/jobs.json";

const onlyAlpha = /^[a-zA-Z ]+$/;
// const emailRegex =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+*$/;
const alphaNumeric = /^[a-zA-Z0-9]+$/;

export const onChangeValidator = (id, value) => {
  switch (id) {
    case "fullname":
      if (onlyAlpha.test(value) && value?.trim()?.length > 2) {
        return true;
      } else return false;
    case "password":
      if (
        alphaNumeric.test(value) &&
        value?.trim()?.length >= 8 &&
        value?.trim()?.length <= 20
      ) {
        return true;
      } else return false;
    case "mobile":
      if (!!Number(value) && value?.trim()?.length === 10) {
        return true;
      } else return false;

    default:
      break;
  }
};
export const multiStageFormValidator = (id, value) => {
  switch (id) {
    case "appName":
      if (onlyAlpha.test(value) && value?.trim()?.length > 2) {
        return true;
      } else return false;
    case "appMobile":
      if (!!Number(value) && value?.trim()?.length === 10) {
        return true;
      } else return false;
    case "seekerAge":
      if (!!Number(value) && Number(value) > 14) {
        return true;
      } else return false;
    case "seekerAddress":
      if (value?.trim()?.length > 5) {
        return true;
      } else return false;
    case "providerAddress":
      if (value?.trim()?.length > 5) {
        return true;
      } else return false;
    case "providerEmail":
      if (
        value !== "" &&
        (value.length < 5 || !["@", "."].every((str) => value.includes(str)))
      ) {
        return false;
      }
      return true;
    case "seekerQualification":
      if (qualificationData?.qualifications?.includes(value)) {
        return true;
      } else return false;
    case "seekerPreferenceOne":
      if (jobsData?.jobs?.includes(value)) {
        return true;
      } else return false;
    case "seekerPreferenceTwo":
      if (jobsData?.jobs?.includes(value)) {
        return true;
      } else return false;
    case "providerQualifications":
      if (Array.isArray(value) && value?.length > 0) {
        return true;
      } else return false;
    case "vacancyCount":
      if (!!Number(value) && Number(value) > 0) {
        return true;
      } else return false;
    case "workDetails":
      if (value && value?.trim()?.length > 5) {
        return true;
      } else return false;

    default:
      break;
  }
};
export const signUpFormValidator = (
  userFullname,
  userSignUpId,
  userDOB,
  userGender,
  userSignUpPassword,
  userEmail = ""
) => {
  const result = {
    userFullname: false,
    userSignUpId: false,
    userDOB: false,
    userGender: false,
    userSignUpPassword: false,
    userEmail: true,
  };

  const dateDOB = new Date(userDOB);

  if (onlyAlpha.test(userFullname) && userFullname?.length > 2) {
    result.userFullname = true;
  }
  if (!!Number(userSignUpId) && userSignUpId?.length === 10) {
    result.userSignUpId = true;
  }
  if (
    dateDOB !== "Invalid Date" &&
    !isNaN(dateDOB) &&
    dateDOB.getFullYear() > 1900 &&
    new Date().getFullYear() > new Date(dateDOB).getFullYear()
  ) {
    result.userDOB = true;
  }
  if (["Male", "Female", "Other"].includes(userGender)) {
    result.userGender = true;
  }
  if (
    alphaNumeric.test(userSignUpPassword) &&
    userSignUpPassword.length >= 8 &&
    userSignUpPassword.length <= 20
  ) {
    result.userSignUpPassword = true;
  }
  if (
    userEmail !== "" &&
    (userEmail.length < 5 ||
      !["@", "."].every((str) => userEmail.includes(str)))
  ) {
    result.userEmail = false;
  }
  return result;
};

export const loginFormValidator = (loginId, password) => {
  const result = { loginId: false, password: false };
  if (!!Number(loginId) && loginId?.length === 10) {
    result.loginId = true;
  }
  if (
    alphaNumeric.test(password) &&
    password.length >= 8 &&
    password.length <= 20
  ) {
    result.password = true;
  }
  return result;
};

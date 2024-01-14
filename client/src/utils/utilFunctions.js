export const getValueFromRef = (ref, id) =>
  ref?.current.querySelector(`#${id}`)?.value?.trim();
export const getRadioCheckedValue = (ref, id,type="radio") => {
  const options = ref?.current.querySelectorAll(`#${id} input`) || [];
  if(type==="checkbox"){
    const checkedInputs = [...options].filter((option) => option.checked);
    return checkedInputs?.map((option) => option.id);
  }
  return [...options].find((option) => option.checked)?.value;
};

export const idToStrFunc = (id) => {
  switch (id) {
    case "appMobile":
      return "Applicant Mobile";
    case "appName":
      return "Applicant Name";
    case "jobType":
      return "Application Type";
    case "seekerAddress":
      return "Applicant Address";
    case "seekerAge":
      return "Applicant Age";
    case "seekerPreferenceOne":
      return "Job Preference 1";
    case "seekerPreferenceTwo":
      return "Job Preference 2";
    case "seekerQualification":
      return "Applicant Qualification";
    case "providerAddress":
      return "Company details";
    case "providerQualifications":
      return "Expected Qualifications";
    case "vacancyCount":
      return "Vacancy Count";
    case "workDetails":
      return "Workplace and salary details";
    default:
      return "";
  }
};

export const valueToStrFunc = (value) => {
  if (typeof value === "string") {
    if (value.split("\n").length > 1) {
      return value.split("\n").map((i, key) => <p key={key}>{i}</p>);
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value?.join("; ");
  }
};

export const MMDDYYYYConverter=(date)=>{
  const d = new Date(date)
  return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
}
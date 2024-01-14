import React from "react";
import data from "../../utils/static/homepageContent.json";


const GettingStarted = () => {
  return (
    <>
      <section id="jobseeker">
        <h2 className="mt-5">Can I be employed?</h2>
        <article
          className="fs-4 text"
        >{data.jobSeeker.generalInfo}</article>
      </section>
      <section id="jobprovider" style={{marginBottom:"2rem"}}>
        <h2 className="mt-5">Can I be a job provider?</h2>
        <article
          className="fs-4 text"
        >{data.jobProvider.generalInfo}</article>
      </section>
    </>
  );
};

export default GettingStarted;

import React from "react";
import data from "../../utils/static/homepageContent.json";

const Services = () => {
  return (
    <section id="services" style={{ marginBottom: "5rem" }}>
      <h2>Services we provide</h2>
      <h3 className="text-center text-success fst-italic">
        "{data.services.quote}"
      </h3>
      <article className="fs-4 text">{data.services.generalInfo}</article>
      <article className="fs-4 text">
        <h3 className="mt-5">Features of this application</h3>
        <ul>
          {data.services.keyServices.map((i,idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Services;

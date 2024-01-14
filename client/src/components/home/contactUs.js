import React from "react";
import Card from "react-bootstrap/Card";
import data from "../../utils/static/homepageContent.json";
import pic from "../../assets/images/contactus/divineYouth.jpg";

const ContactUs = () => {
  return (
    <section id="contactus" style={{ marginBottom: "5rem" }}>
      <h2>Contact us</h2>
      <article style={{rowGap:"1rem"}} className="fs-4 text d-flex justify-content-evenly flex-wrap">
          {data.contactUs.map((person, idx) => (
            <Card className="text-center" key={idx} style={{ maxWidth: "20rem" }}>
              <Card.Img variant="top" src={pic} />
              <Card.Body>
                <Card.Title>{person.name.toUpperCase()}</Card.Title>
                <Card.Text>{person.email}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </article>
    </section>
  );
};

export default ContactUs;

import React from "react";
import Card from "react-bootstrap/Card";

const CardComponent = ({title="",subtitle="",additionalContent="",links}) => {
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>
          {additionalContent}
        </Card.Text>
        {/* <Card.Link href="#">Approve</Card.Link>
        <Card.Link href="#">Delete</Card.Link> */}
      </Card.Body>
    </Card>
  );
};

export default CardComponent;

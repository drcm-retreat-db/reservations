import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { idToStrFunc, valueToStrFunc } from "../../utils/utilFunctions";

const PrintView = ({dataObj}) => {
  return (
    <Container className="print-container-body">
      <Row>
        <Col className="text-center text-uppercase fw-bold">
          Application Form
        </Col>
      </Row>
      {Object.keys(dataObj)?.map((id, index) => {
        if (idToStrFunc(id) && idToStrFunc(id) !== "") {
          return (
            <Row className="text-uppercase" key={`${index}`}>
              <Col style={{ flex: 1, padding: "0.5rem" }}>{`${index + 1}`}</Col>
              <Col style={{ flex: 12, padding: "0.5rem" }}>{`${idToStrFunc(
                id
              )}`}</Col>
              <Col
                className="fw-bolder"
                style={{ flex: 14, padding: "0.5rem" }}
              >
                {valueToStrFunc(dataObj[id])}
              </Col>
            </Row>
          );
        }
      })}
    </Container>
  );
};

export default PrintView;

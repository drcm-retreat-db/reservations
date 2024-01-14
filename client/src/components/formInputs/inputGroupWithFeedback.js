import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const InputGroupWithFeedback = ({
  controlId,
  type = "text",
  labelText,
  placeholder,
  onChange=()=>{}
}) => {
  return (
    <Form.Group className="my-3" controlId={controlId}>
      <InputGroup>
        <InputGroup.Text>{labelText}</InputGroup.Text>
        <Form.Control
          type={type}
          placeholder={placeholder || ""}
          onChange={onChange}
        />
      </InputGroup>
      <Form.Text id={`${controlId}Helper`}></Form.Text>
    </Form.Group>
  );
};

export default InputGroupWithFeedback;

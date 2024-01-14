import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

const AlertPopup = ({
  title = "Alert",
  show = false,
  setShow,
  footerBtnOptions={
      positiveBtnAction:()=>setShow(false),
      negativeBtnAction:null,
  },
  closeButton = true,
  fullscreen = false,
  scrollable = false,
  centered = true,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      fullscreen={fullscreen}
      keyboard={false}
      scrollable={scrollable}
      centered={centered}
    >
      <Modal.Header closeButton={closeButton}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {footerBtnOptions.negativeBtnAction && (
          <Button
            variant="secondary"
            onClick={footerBtnOptions.negativeBtnAction}
          >
            {footerBtnOptions.negativeBtnLabel || "Cancel"}
          </Button>
        )}
        <Button variant="primary" onClick={footerBtnOptions?.positiveBtnAction}>
          {footerBtnOptions.positiveBtnLabel || "Okay"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertPopup;

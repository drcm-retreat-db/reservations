import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

const ModalComponent = ({
  modalTitle = "",
  footerBtnOptions = {
    positiveBtnLabel: "okay",
    positiveBtnAction: null,
    negativeBtnLabel: "cancel",
    negativeBtnAction: null,
  },
  show = false,
  setShow,
  children,
  scrollable = false,
  centered = false,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        fullscreen="md-down"
        keyboard={false}
        scrollable={scrollable}
        centered={centered}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          {footerBtnOptions.negativeBtnAction && (
            <Button
              variant="secondary"
              onClick={footerBtnOptions.negativeBtnAction}
            >
              {footerBtnOptions.negativeBtnLabel}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={footerBtnOptions.positiveBtnAction}
          >
            {footerBtnOptions.positiveBtnLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;

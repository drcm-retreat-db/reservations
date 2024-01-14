import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/esm/Modal";
import DoubleRing from "../../assets/images/loaderGif/loaderDoubleRing.gif";
import Ellipse from "../../assets/images/loaderGif/loaderEllipse.gif";
import Infinity from "../../assets/images/loaderGif/loaderInfinity.gif";
import Spinner from "../../assets/images/loaderGif/loaderSpinner.gif";

const Loader = ({ show, size = "200", loaderType = "Ellipse" }) => {
  const [styles, setStyles] = useState({});
  function getLoaderSrc() {
    switch (loaderType) {
      case "Ellipse":
        return Ellipse;
      case "DoubleRing":
        return DoubleRing;
      case "Infinity":
        return Infinity;
      case "Spinner":
        return Spinner;
      default:
        break;
    }
  }
  useEffect(() => {
    setStyles({
      position: "absolute",
      background:`url(${getLoaderSrc()}) center`,
      backgroundSize: `${size}px`,
      top: `calc(50% - ${parseInt(size) / 2}px)`,
      left: `calc(50% - ${parseInt(size) / 2}px)`,
      width: `${size}px`,
      height: `${size}px`,
    });
  }, [size]);

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        fullscreen
        keyboard={false}
        animation={false}
        contentClassName="position-relative"
      >
        <Modal.Body>
          <div style={styles} alt="loading" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Loader;

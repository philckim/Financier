import React from "react";

import Button from "../shared/Button";
import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}>
      <h4 style={{ color: "black" }}>{props.error}</h4>
    </Modal>
  );
};

export default ErrorModal;

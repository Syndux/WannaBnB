import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          onClick();
        }}
      >
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

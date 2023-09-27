import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpFormModal({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          onClick();
        }}
        className="button-exclude"
      >
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;

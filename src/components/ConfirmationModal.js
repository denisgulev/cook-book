import React from "react";
import Modal from "react-modal";

const ConfirmationModal = props => (
  <Modal
    isOpen={!!props.isRemoveRequested}
    ariaHideApp={false}
    contentLabel="Remove Confirmation"
    className="modal"
  >
    <h3 className="modal__title">Attenzione</h3>
    {props.isRemoveRequested && (
      <p className="modal__body">
        Confermi l'eliminazione di {props.selectedRecipe}?
      </p>
    )}
    <div className="modal__actions">
      <button className="button" onClick={props.handleConfirmation}>
        Procedi
      </button>
      <button className="button" onClick={props.handleCancellation}>
        Annulla
      </button>
    </div>
  </Modal>
);

export default ConfirmationModal;

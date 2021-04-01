import React from "react";
import ClayButton from "@clayui/button";
import ClayModal from "@clayui/modal";

export const Modal = ({
  visible,
  observer,
  title,
  children,
  onClose,
  onSubmit,
  submitText,
}) => {
  if (visible) {
    return (
      <ClayModal observer={observer} size="lg">
        <ClayModal.Header>{title}</ClayModal.Header>
        <ClayModal.Body>{children}</ClayModal.Body>
        <ClayModal.Footer
          first={
            <ClayButton.Group spaced>
              <ClayButton displayType="secondary" onClick={onClose}>
                Cancel
              </ClayButton>
            </ClayButton.Group>
          }
          last={<ClayButton onClick={onSubmit}>{submitText}</ClayButton>}
        />
      </ClayModal>
    );
  }

  return null;
};

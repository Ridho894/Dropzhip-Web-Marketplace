import Image from "next/image";
import React, { Fragment } from "react";

import Button from "../core/Button";
import Modal from "../core/Modal";
import { toastSuccess } from "../core/Toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleted: string | number;
  moreThanOne?: boolean;
}

const ModalDeleteProduct: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  deleted,
  moreThanOne,
}) => {
  const handleOnConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="small">
      <div className="mb-6">
        <div className="mb-4 items-center flex gap-3 text-left">
          <div>
            <Image
              src="/icons/duotone/WarningLight.svg"
              width={48}
              height={48}
              alt="Warning"
            />
          </div>
          <h5 className="text-sub1 text-base-900 font-medium mb-2">
            {moreThanOne
              ? `Are you sure you want to delete ${deleted} product?`
              : `Are you sure you want to delete "${deleted}" products?`}
          </h5>
        </div>
        <div>
          <p className="text-sub2 text-base-900 font-normal">
            {moreThanOne
              ? "You are about to delete the selected product permanently. You will not be able to recover this changes."
              : "You are about to delete a product. This action cannot be undone"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          size="m"
          full
          variant="secondary"
          className="px-6 text-sub2 font-bold py-2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="m"
          full
          onClick={handleOnConfirm}
          className="px-6 text-sub2 font-bold py-2"
        >
          Yes, Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;

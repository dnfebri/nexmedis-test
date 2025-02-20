import IconPlus from "@/components/icon/icon-plus";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import React, { Fragment } from "react";

export const ModalWrapper = ({
  children,
  handleCloseModal,
  handleShowModal,
  isCreate = false,
}: {
  children: React.ReactNode;
  handleShowModal: () => void;
  handleCloseModal: () => void;
  isCreate?: boolean;
}) => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal") === "open" ? true : false;

  return (
    <>
      {isCreate && (
        <button
          onClick={handleShowModal}
          type="button"
          className="btn btn-primary flex gap-2 items-center"
        >
          <IconPlus />
          <span>Add</span>
        </button>
      )}
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" open={modal} onClose={handleCloseModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </TransitionChild>
          <div
            id="fadein_modal"
            className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
          >
            <div className="flex items-start justify-center min-h-screen px-4">
              <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__fadeIn">
                {children}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

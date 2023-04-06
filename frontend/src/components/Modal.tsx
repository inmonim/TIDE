import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Modal({deleteDiary, closeModal, isOpen} : any) {

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    다이어리를 삭제하시겠습니까?
                  </Dialog.Title>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center min-w-[4.5rem] px-4 py-1 mr-2 text-sm font-medium text-white bg-red-900 border border-transparent rounded-md hover:bg-red-800 focus:outline-none "
                      onClick={deleteDiary}
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-1 min-w-[4.5rem] text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none "
                      onClick={closeModal}
                    >
                      취소
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

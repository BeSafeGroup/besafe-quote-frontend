import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { QuoteRoom } from '../types'
import { formatCurrency } from '../utils'
import { useTranslation } from 'react-i18next'

export default function RoomDetailModal ({
  room,
  visible,
  onClose
} : {
  room: QuoteRoom,
  visible: boolean,
  onClose: () => void
}) {

  const { t } = useTranslation()
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="p-4 text-lg font-semibold leading-6 text-gray-900">
                    {room.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className='h-52 bg-cover bg-center w-full' style={{
                      backgroundImage: `url(${room.imageUrl})`
                    }}></div>

                    <div className='text-slate-500 px-4'>
                      <div className='mt-4' dangerouslySetInnerHTML={{
                        __html: room.description
                      }}>
                      </div>

                      <div className='mt-4'>
                        <div className='font-bold text-xl text-slate-600'>{formatCurrency(room.price)}</div>
                        <div>
                          {room.adults} {t('Adulti')} e {room.children} {t('Bambini')}
                        </div>
                      </div>   
                    </div>                
                  </div>
                </div>
                <div className="px-4 pb-4 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto"
                    onClick={() => onClose()}
                  >
                    Ho capito
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

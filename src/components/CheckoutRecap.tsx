import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../hooks"
import dayjs from "dayjs"
import { formatCurrency } from "../utils"
import { useEffect, useState } from "react"
import { QuoteRoom } from "../types"
import RoomDetailModal from "./RoomDetailModal"
import { useParams } from "react-router-dom"
import { insuranceCost, quoteTotal, setSelectedOption } from "../store/quoteSlice"
import { useSelector } from "react-redux"
import RoomPolicyButton from "./RoomPolicyButton"

export default function CheckoutRecap () {

  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const { optionid } = useParams()

  const insuranceTotal = useSelector(insuranceCost)
  const generalTotal = useSelector(quoteTotal)
  const { quote, selectedOption, acceptedInsurance, info } = useAppSelector(state => state.quote)
  const [detailRoom, setDetailRoom] = useState<QuoteRoom | undefined>()

  useEffect(() => {
    if (optionid) {
      const o = quote?.options.find(i => i.idQuoteOption.toString() === optionid.toString()) 
      if (o) {
        dispatch(setSelectedOption(o))
      }
    }
  }, [
    quote,
    optionid
  ])
  
  if (!quote || !selectedOption) return <></>

  return (
    <div className="w-1/3 text-slate-500">
      {
        detailRoom && <RoomDetailModal onClose={() => setDetailRoom(undefined)} visible={detailRoom !== undefined} room={detailRoom} />
      }
      <div className="border bg-white p-6 sticky top-0 text-slate-600 rounded-md">
        <div className="mb-1 text-xl font-medium text-slate-700">
          {t('Il tuo soggiorno')}
        </div>
        <div className="text-slate-500 mb-2">
          {t('breve riepilogo delle sistemazioni selezionate')}
        </div>

        <div className="text-slate-500 flex justify-between border-t border-b my-4 py-4 space-x-4">
          <div>
            <div className="font-medium text-slate-600">Check-in</div>
            {t('dopo le')} {info?.checkIn}
          </div>
          <div>
            <div className="font-medium text-slate-600">Check-out</div>
            {'entro le'} {info?.checkOut}
          </div>
        </div>

        <div>
          {dayjs(selectedOption.arrival.toString(), 'YYYYMMDD').format('ddd DD MMM, YYYY')} - {dayjs(selectedOption.departure.toString(), 'YYYYMMDD').format('ddd DD MMM, YYYY')}
        </div>
        <div className="flex space-x-1">
          <span>{selectedOption.rooms.reduce((prev, curr) => prev + curr.adults, 0)} {t('Adulti')}</span>
          {
          selectedOption.rooms.reduce((prev, curr) => prev + curr.children, 0) > 0 &&
          <span>
            - {selectedOption.rooms.reduce((prev, curr) => prev + curr.children, 0)} {t('Bambini')}
          </span>
          }
        </div>
        
        <div className="border-t mt-4 pt-4">
          {
            selectedOption.rooms.map((room, index) => (
              <div>
                <div className="flex justify-between" key={`room-${index}`}>
                  <div>
                    <button className="text-underline" onClick={() => setDetailRoom(room)}>1x {room.title}</button>
                  </div>
                  <div>
                    {formatCurrency(room.price)}
                  </div>
                </div>
                <RoomPolicyButton />
              </div>
            ))
          }
        </div>

        {
          (acceptedInsurance && insuranceTotal > 0) &&
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between">
              <div>
                <button className="text-underline">{t('Assicurazione annullamento')}</button>
              </div>
              <div>
                {formatCurrency(insuranceTotal || 0)}
              </div>
            </div>
          </div>
        }

        {
          (quote.besafeIncluded || acceptedInsurance) &&
          <div className="border-t mt-4 pt-4">
            <div className="flex items-center space-x-2">
              <div>
                <img className="w-4" src="/logo_rate_small.svg"></img>
              </div>
              <div className="font-semibold">
                {t('Include l\'assicurazione sul rimborso')}
              </div>
            </div>
            <div className="mt-2">
              {t('In caso di cancellazione puoi richiedere il rimborso delle somme pagate per qualsiasi motivo oggettivamente documentabile')}
            </div>

            <div className="mt-2">
              <a className="text-orange-600 underline flex space-x-2 items-center" target="_blank" href="https://travel.besafesuite.com/insurances/besafe-plus">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <div>{t('Scopri il fascicolo assicurativo')}</div>
              </a>
            </div>

          </div>
        }

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-xl">
            <div className="font-bold">
              {t('Totale')}
            </div>
            <div>
              {formatCurrency(generalTotal || 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
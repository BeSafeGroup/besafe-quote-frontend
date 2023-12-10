import { useTranslation } from "react-i18next"
import { QuoteOption, QuoteRoom, RoomImage } from "../types"
import { classNames, formatCurrency } from "../utils"
import { useAppDispatch, useAppSelector } from "../hooks"
import { setSelectedOption } from "../store/quoteSlice"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Modal from "./Modal"
import { useNavigate, useParams } from "react-router-dom"
import RoomPolicyButton from "./RoomPolicyButton"

const RoomCard = ({ room } : { room: QuoteRoom }) => {

  const { t } = useTranslation()

  const [zoomImage, setZoomImage] = useState<boolean>()
  const [selectedImage, setSelectedImage] = useState<RoomImage | undefined>()

  useEffect(() => {
    if (selectedImage === undefined && room && room.room && room.room.images.length > 0) {
      setSelectedImage(room.room.images[0])
    }
  }, [ room, selectedImage ])

  return (
    <div className="px-4 pb-4 flex space-x-2">
      {
        zoomImage &&
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-cover bg-center h-[70%] w-[70%] rounded-md" style={{
            backgroundImage: `url(${selectedImage?.imageUrl})`
          }}>
            <button onClick={() => setZoomImage(false)} className="absolute top-6 right-6 bg-white rounded-md px-4 py-2 shadow-xl text-orange-600 font-extrabold">CHIUDI</button>
          </div>
        </div>
      }

      <div className="w-1/3">
        <div
          onClick={() => {
            if (selectedImage && selectedImage.imageUrl) setZoomImage(true)
          }}
          className="h-56 w-full rounded-md bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedImage ? selectedImage.imageUrl : ''})` }}
        />
        <div className="mt-2 grid grid-cols-4 gap-2">
          {room.room.images.map((image, index) => (
            <div
              key={`image-gallery-${index}`}
              className={
                classNames(
                  'w-12 h-12 bg-cover bg-center rounded-md',
                  selectedImage?.idRoomImage === image.idRoomImage ? 'outline outline-4 outline-orange-100 border border-orange-600' : ''
                )
              }
              style={{ backgroundImage: `url(${image.imageUrl})` }}
              onClick={() => {
                setSelectedImage(image)
              }}
            />
          ))}
        </div>
      </div>
      <div className="text-slate-600 px-4 flex flex-col space-y-1">
        <div className="text-lg font-bold">{room.title}</div>
        <div className="text-slate-500 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
          </svg>
          <div>
            <span>{room.adults} {t('adulti')}</span>
            {room.children > 0 && <span>, {room.children} {t('bambini')}</span>}
          </div>
        </div>

        <div>
          {room.description}
        </div>

        <div className="text-lg font-semibold text-slate-700">
          {formatCurrency(room.price)}
        </div>
      </div>
    </div>
  )

}

export default function QuoteOptionItem ({
  option,
  index
} : {
  option: QuoteOption,
  index: number
}) {

  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { quote, selectedOption } = useAppSelector(state => state.quote)
  const dispatch = useAppDispatch()

  const [viewPolicy, setViewPolicy] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (quote && quote.options.length === 1) {
      setShowDetails(true)
    }
  }, [ quote ])

  if (!quote) return <></>

  function getOptionDates () {
    const arrival = dayjs(option.arrival.toString(), 'YYYYMMDD')
    const departure = dayjs(option.departure.toString(), 'YYYYMMDD')

    if (arrival.month() === departure.month()) {
      return `dal ${arrival.format('ddd DD')} al ${departure.format('ddd DD MMMM YYYY')}`
    } else if (arrival.month() !== departure.month() && arrival.year() === departure.year()) {
      return `dal ${arrival.format('ddd DD MMMM')} al ${departure.format('ddd DD MMMM YYYY')}`
    } else if (arrival.year() !== departure.year()) {
      return `dal ${arrival.format('ddd DD MMMM YYYY')} al ${departure.format('ddd DD MMMM YYYY')}`
    }
  }
  
  return (
    <>
      <div className={
        classNames(
          'cursor-pointer rounded-md bg-white shadow-xl',
          (selectedOption && selectedOption.idQuoteOption === option.idQuoteOption)
            ? 'border border-orange-600 outline outline-orange-200 outline-4' : '',
          (selectedOption && selectedOption.idQuoteOption !== option.idQuoteOption)
            ? 'opacity-50' : 'opacity-100'
        )
      } onClick={() => {
        dispatch(setSelectedOption(option))
      }}>
        <div className="flex space-x-2 items-center justify-between relative">
          <div className="absolute w-10 h-10 -left-5 flex items-center justify-center text-white border-slate-200 border-4 bg-orange-600 rounded-full">
            {index + 1}
          </div>

          <div className="p-4 px-6 text-slate-700">
            <div className="text-xl mb-1 font-bold text-slate-700">
              {t('Proposta')} {quote.options.length > 1 && <span>{index + 1}</span>}
              <div className="text-lg font-medium text-slate-600">
                {getOptionDates()}
              </div>
            </div>
            <div className="text-slate-500">
              {option.rooms.length} {t('camere')}
            </div>
          </div>

          {
            quote.options.length > 1 &&
            <div className="p-4">
              <button
                onClick={() => {
                  setShowDetails(!showDetails)
                }}
                className="border border-orange-600 px-4 py-2 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all">
                  { showDetails ? t('Nascondi proposta') : t('Mostra proposta') }
              </button>
            </div>
          }
        </div>
        {
          showDetails &&
          <>
            <div>
              {
                option.rooms.map((room, roomIndex) => <RoomCard key={`room-${roomIndex}`} room={room} />)
              }
            </div>
            <div className="border-t flex justify-between px-4 pt-4 pb-4">
              <div>
                <div className="flex space-x-2 items-center">
                  <div className="text-2xl text-slate-800 font-bold">
                    {formatCurrency(option.rooms.reduce((prev, curr) => prev + curr.price, 0))}
                  </div>
                  <div className="text-slate-600">
                    per {dayjs(option.departure.toString(), 'YYYYMMMDD').diff(dayjs(option.arrival.toString(), 'YYYYMMMDD'), 'days')} notti
                  </div>
                </div>
                <RoomPolicyButton />
              </div>
              <div>
                {
                  (selectedOption && selectedOption.idQuoteOption === option.idQuoteOption) &&
                  <motion.div initial={{ bottom: -100 }} animate={{ bottom: 0}} className="relative p-4">
                    <button onClick={() => navigate(`/${id}/${option.idQuoteOption}/checkout`)} className="w-full bg-orange-600 rounded-md px-4 py-2 text-white font-bold">
                      {t('Accetta questa proposta')}
                    </button>
                  </motion.div>
                }
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
  
}
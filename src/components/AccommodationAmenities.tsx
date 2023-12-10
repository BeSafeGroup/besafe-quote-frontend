import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchAccomodationAmenities, fetchAccomodationInfo } from "../store/quoteSlice"
import { AccomodationAmenity } from "../types"
import { useTranslation } from "react-i18next"
import { formatCurrency } from "../utils"

const iconsMap = {
  room_service: 'room_service',
  business: 'work',
  hotel_service: 'concierge',
  activities: 'hiking',
  wellness: 'spa',
  parking: 'local_parking',
  bathroom: 'shower'
} as any

export default function AccommodationAmenities () {

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { accommodation, amenities, info } = useAppSelector(state => state.quote)

  const aggregatedAmenities = useMemo<{ [key: string]: AccomodationAmenity[] }>(() => {
    if (!amenities) return []
    return amenities.reduce((prev, curr) => {
      prev[curr.category] = prev[curr.category] || []
      prev[curr.category].push(curr)
      return prev
    }, Object.create(null))
  }, [ amenities ])

  useEffect(() => {
    if (!accommodation) return
    dispatch(fetchAccomodationAmenities(accommodation.idAccomodation))
    dispatch(fetchAccomodationInfo(accommodation.idAccomodation))
  }, [
    accommodation
  ])

  const AmenityBox = ({ categoryKey } : { categoryKey: string }) => (
    <div>
      <div className="text-slate-600 flex space-x-2 items-center">
        <div className="material-symbols-outlined">
          {iconsMap[categoryKey]}
        </div>
        <div className="font-medium">{t(categoryKey)}</div>
      </div>

      <div className="flex flex-col space-y-2 pl-8 mt-2">
      {
        aggregatedAmenities[categoryKey] && aggregatedAmenities[categoryKey].map((amenity, index) => (
          <div key={`amenity-${index}`} className="flex space-x-2 text-slate-500 items-center">
            <div className="text-sm material-symbols-outlined">
              check
            </div>
            <div>{amenity.amenityDescription}</div>
          </div>
        ))
      }
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-md p-6">
      <div className="text-xl text-slate-700 font-bold mb-4">{t('Sul nostro hotel')}</div>

      <div className="mb-6 text-slate-600" dangerouslySetInnerHTML={{
        __html: info?.description || ''
      }} />

      <div className="border-t text-slate-600 border-b py-6 my-8 flex flex-col space-y-4">
        
        <div className="flex">
          <div className="w-44 flex space-x-2 items-center">
            <div className="text-md material-symbols-outlined">
              login
            </div>
            <div>{t('Check-in')}</div>
          </div>

          <div>
            {t('dalle ore')} {info?.checkIn} {t('entro le ore')} {info?.checkOut}
          </div>
        </div>

        <div className="flex">
          <div className="w-44 flex space-x-2 items-center">
            <div className="text-md material-symbols-outlined">
              pets
            </div>
            <div>{t('Animali')}</div>
          </div>

          <div>
            {
              info?.petsAllowed
              ? <div>
                  <div className="text-green-600">{t('Gli animali sono ammessi')}</div>
                  {
                    info.petsCost > 0 &&
                    <div className="mt-1 italic">{t('è previsto un supplemento per notte di')} {formatCurrency(info.petsCost)}</div>
                  }
                </div>
              : <div className="text-yellow-600">{t('Gli animali non sono ammessi')}</div>
            }
          </div>
        </div>

        <div className="flex">
          <div className="w-44 flex space-x-2 items-center">
            <div className="text-md material-symbols-outlined">
              child_care
            </div>
            <div>{t('Bambini')}</div>
          </div>

          <div>
            {t(' I bambini dopo i')} {info?.childrenMaxAge} {t('verranno addebitati come adulti')}
          </div>
        </div>

      </div>

      <div>
        <div className="grid grid-cols-2 gap-6">
          
          <div className="flex flex-col space-y-6">
            <AmenityBox categoryKey={'hotel_service'} />
            <AmenityBox categoryKey={'room_service'} />
            <AmenityBox categoryKey={'business'} />
          </div>

          <div className="flex flex-col space-y-6">
            <AmenityBox categoryKey={'wellness'} />
            <AmenityBox categoryKey={'activities'} />
            <AmenityBox categoryKey={'parking'} />
          </div>

        </div>
      </div>
    </div>
  )

}
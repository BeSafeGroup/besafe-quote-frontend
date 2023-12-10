import { useAppSelector } from "../hooks"
import { useTranslation } from "react-i18next"

export default function QuoteHero () {

  const { t } = useTranslation()

  const { quote, accommodationSettings } = useAppSelector(state => state.quote)

  return (
    <div className="flex flex-col space-y-4">

      <div className="flex space-x-4 justify-between items-center">
        <div>
          <img className="w-44" src={accommodationSettings?.logo} alt="" />
        </div>

        <div>
        </div>
      </div>

      <div className="rounded-t-md overflow-hidden">
        <div className="bg-cover bg-center h-64" style={{
          backgroundImage: `url(${accommodationSettings?.cover})`
        }}>
          <div className="text-white bg-black/60 w-full h-full flex flex-col items-center justify-center">
            <div className="text-3xl font-extrabold">{t('Bentrovato')} {quote?.firstName} {quote?.lastName}</div>
            <div className="text-xl">questa è la tua offerta riservata</div>
          </div>
        </div>
      </div>
    </div>
  )

}
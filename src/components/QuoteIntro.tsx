import { useTranslation } from "react-i18next"
import { useAppSelector } from "../hooks"
import dayjs from "dayjs"

export default function QuoteIntro () {

  const { quote, accommodation } = useAppSelector(state => state.quote)
  const { t } = useTranslation()

  if (!quote || !accommodation) return <></>

  return (
    <div className="bg-white rounded-b-md p-6">
      <div className="text-slate-700 text-lg font-bold">
        {t('Gentile')} {quote?.firstName} {quote?.lastName}
      </div>

      <div className="text-slate-500 mt-4">
        {t('di seguito la nostra migliore offerta per il suo soggiorno presso la nostra struttura {{name}}. Speriamo di poter soddisfare le sue esigenze e speriamo di poterla accogliere presto!', { name: accommodation?.accomodationName })}
      </div>

      {
        (quote.expiresAt !== undefined) &&
        <div className="font-medium mt-4 text-slate-600">
          {t(
            'Il preventivo scade il {{expireTime}} ({{expireFrom}})',
            {
              expireTime: dayjs(quote.expiresAt, 'YYYYMMDDHHmm').format('DD/MM/YYYY HH:mm'),
              expireFrom: dayjs(quote.expiresAt, 'YYYYMMDDHHmm').fromNow()
            }
          )}
        </div>
      }
    </div>
  )

}
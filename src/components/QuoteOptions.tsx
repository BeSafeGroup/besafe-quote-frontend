import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useNavigate, useParams } from "react-router-dom"
import QuoteOptionItem from "./QuoteOptionItem"

export default function QuoteOptions () {

  const { t } = useTranslation()

  const { quote } = useAppSelector(state => state.quote)

  return (
    <div>
      <div className="bg-white rounded-md shadow-xl p-6">
        <div className="text-slate-600 font-bold text-lg">
          {t('Le nostre proposte')}
        </div>

        <div className="text-slate-500 mt-2">
          {t('di seguito {{count}} proposte per le date richieste, può scegliere quella che preferisce e inviare i suoi dati per conferma.', { count: quote?.options.length })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6">
        {
          quote?.options.map((option, index) => <QuoteOptionItem key={index} option={option} index={index} />)
        }
      </div>
    </div>
  )

}
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../hooks"

export default function InsuranceProposal () {

  const { t } = useTranslation()
  const { quote } = useAppSelector(state => state.quote)

  return (
    <div className="bg-white flex flex-col space-y-6 rounded-md p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex space-x-4 items-center">
          <div>
            <img className="w-6" src="/logo_rate_small.svg"></img>
          </div>
          {
            quote?.besafeIncluded 
            ? <div className="text-slate-700 font-semibold text-xl">
              {t('Il tuo soggiorno è al sicuro!')}
            </div>
            : <div className="text-slate-700 font-semibold text-xl">
              {t('Vuoi proteggere il tuo soggiorno?')}
            </div>
          }
        </div>

        <div>
          {
            quote?.besafeIncluded 
            ? <div className="bg-orange-600 text-white rounded-full px-2 py-1 text-sm font-semibold">
              {t('Incluso nel prezzo!')}
            </div>
            : <div>
              + {quote?.insuranceRate} EUR
            </div>
          }
        </div>
      </div>

      <div className="text-slate-500 leading-relaxed">
        {t('Questo preventivo include la garanzia di rimborso BeSafe Rate. Si tratta di una copertura assicurativa che ti garantisce il rimborso dell\'importo prepagato per qualsiasi motivo oggettivamente documentabile. Il rimborso è garantito in 7 giorni. Oltre a una valida copetura medico-bagaglio durante tutto il soggiorno.')}
      </div>

      <div>
        <a className="text-orange-600 underline flex space-x-2 items-center" target="_blank" href="https://travel.besafesuite.com/insurances/besafe-plus">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          <div>{t('Scopri il fascicolo assicurativo')}</div>
        </a>
      </div>

      {
        !quote?.besafeIncluded &&
        <button className="font-medium px-4 py-2 rounded-md bg-orange-50 text-orange-600">
          {t('Aggiungi per')} {quote?.insuranceRate} EUR
        </button>
      }
    </div>
  )

}
import { useState } from "react";
import Modal from "./Modal";
import { useAppSelector } from "../hooks";
import { useTranslation } from "react-i18next";

export default function RoomPolicyButton () {

  const { t } = useTranslation()
  const { quote } = useAppSelector(state => state.quote)
  const [viewPolicy, setViewPolicy] = useState(false)

  if (!quote) return <></>

  return (
    <>
    <Modal visible={viewPolicy} onOk={() => setViewPolicy(false)} onClose={() => setViewPolicy(false)} title={t('Politica di cancellazione')}>
      <div className="text-slate-600">
        {
          quote.refundable
          ? 'La prenotazione può essere cancellata senza penali fino al giorno di arrivo. In caso di no-show verrà addebitato il 100% dell\'importo della prenotazione.'
          : <div dangerouslySetInnerHTML={{
            __html: quote?.policyText || ''
          }} />
        }
      </div>

      <>
        {
          !quote.refundable &&
          <>
            {
              quote.besafeIncluded ?
              <div className="mt-4 border-t pt-4">
                <div className="font-bold text-slate-700">
                  {t('Il tuo soggiorno include l\'assicurazione contro l\'annullamento')}
                </div>
                <div className="text-slate-600 mt-2">
                  {t('La tariffa assicurata BeSafe Rate scelta da oltre 200.000 viaggiatori nel mondo ti garnatisce il rimborso per la tua prenotazione non cancellabile in caso di qualunque motiƒzione oggettivamente documentabile. La richiesta di rimborso è completamente digitale con garanzia di esito in soli 7 giorni.')}
                </div>

                <a className="mt-4 text-orange-600 underline flex space-x-2 items-center" target="_blank" href="https://travel.besafesuite.com/insurances/besafe-plus">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <div>{t('Scopri il fascicolo assicurativo')}</div>
                </a>
              </div>
              :
              <div className="mt-4 border-t pt-4">
                <div className="font-bold text-slate-700">
                  {t('Puoi aggiungere l\'assicurazione a questa tariffa')}
                </div>
                <div className="text-slate-600 mt-2">
                  {t('In fase di pagamento puoi decidere di aggiungere, a un piccolo costo aggiuntivo, l\'assicurazione contro l\'annullamento che ti permette di richiedere il rimborso per la prenotazione non rimborsabile per qualsiasi motivazione oggettivamente documentabile con garanzia di liquidazione in 7 gg.')}
                </div>

                <a className="mt-4 text-orange-600 underline flex space-x-2 items-center" target="_blank" href="https://travel.besafesuite.com/insurances/besafe-plus">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <div>{t('Scopri il fascicolo assicurativo')}</div>
                </a>
              </div>
            }
          </>
        }
      </>
    </Modal>

    <button onClick={() => setViewPolicy(true)}>
      {
        (!quote.refundable && !quote.besafeIncluded) &&
        <div className="text-left">
          <div className="text-orange-700">
            {t('Non rimborsabile')}
          </div>
          <div className="text-green-700">
            {t('Assicurabile contro l\'annullamento')}
          </div>
        </div>
      }
      {
        quote.refundable &&
        <div className="text-orange-700">
          {t('Cancellabile gratuitamente (vedi i termini)')}
        </div>
      }
      {
        (quote.besafeIncluded) &&
        <div className="text-green-700 flex space-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          <div>{t('Prepagata con rimborso assicurato')}</div>
        </div>
      }
    </button>
    </>
  )

}
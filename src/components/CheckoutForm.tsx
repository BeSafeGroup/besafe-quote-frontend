import { useTranslation } from "react-i18next"
import { useForm, SubmitHandler, FieldError } from "react-hook-form"
import Toggle from 'react-toggle'
import { useAppDispatch, useAppSelector } from "../hooks"
import { insuranceCost, setAcceptedInsurance } from "../store/quoteSlice"
import { useSelector } from "react-redux"
import { formatCurrency } from "../utils"

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  zip: string,
  phone: string
  privacy: boolean,
  policy: boolean
}

const ErrorBag = ({ error } : { error?: FieldError }) => {
  
  if (!error) return <></>

  if (error.type === 'required') return (
    <div className="mt-1 text-red-600">il campo è obbligatorio</div>
  )

  if (error.message) return (
    <div className="mt-1 text-red-600">{error.message}</div>
  )

  return <></>
}

export default function CheckoutForm () {
  
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const insuranceTotal = useSelector(insuranceCost)
  const { acceptedInsurance } = useAppSelector(state => state.quote)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="border bg-white p-6 rounded-md flex-1">
      <div className="text-xl font-medium text-slate-700">
        {t('I tuoi dettagli')}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              {t('Nome')}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                {...register("firstName", { required: true })}
              />
            </div>
            <ErrorBag error={errors.firstName} />
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              {t('Cognome')}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                {...register("lastName", { required: true })}
              />
              <ErrorBag error={errors.lastName} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('Email')}
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                {...register("email", { required: true })}
              />
              <ErrorBag error={errors.email} />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              {t('Indirizzo completo')}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="address"
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                {...register("address", { required: true })}
              />
              <ErrorBag error={errors.address} />
            </div>
          </div>

          <div>
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
              {t('Codice postale')}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                {...register("zip", { required: true })}
              />
              <ErrorBag error={errors.zip} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t('Telefono')}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="phone"
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                {...register("phone", { required: true })}
              />
              <ErrorBag error={errors.phone} />
            </div>
          </div>
        </div>

        <div className="mt-6 border rounded-md p-6 flex space-x-4">
          <div>
            <img className="w-6" src="/logo_rate_small.svg"></img>
          </div>
          <div className="flex-1">
            <div className="font-bold text-orange-800 text-lg">{t('Assicura il tuo soggiorno')}</div>
            <div className="text-md my-4 text-slate-700 text-normal">
              {t('Trasforma la tua prenotazione non rimborsabile in prenotazione assicurata. In caso di cancellazione potrai ottenere il rimborso fino al 100% delle somme pagate per qualsiasi motivo oggettivamente documentabile.')}
            </div>

            <label className="font-medium flex space-x-2 mt-6 text-slate-600">
              <Toggle checked={acceptedInsurance} onChange={() => dispatch(setAcceptedInsurance(!acceptedInsurance))} />
              <span>Attiva al costo di {formatCurrency(insuranceTotal || 0)}</span>
            </label>
          </div>
        </div>

        <div className="mt-6 w-full relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="privacy"
              aria-describedby="offers-description"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              {...register("privacy", { required: true })}
            />
          </div>
          <div className="cursor-pointer ml-3 leading-6">
            <label htmlFor="privacy" className="font-medium text-gray-900">
              {t('Termini e condizioni sulla privacy')}
            </label>
            <p id="offers-description" className="text-gray-500">
              {t('accetto i termini e le condizioni per il trattamento dei dati personali')}
            </p>
            <ErrorBag error={errors.privacy} />
          </div>
        </div>

        <div className="my-4 w-full relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="policy"
              aria-describedby="offers-description"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              {...register("policy", { required: true })}
            />
          </div>
          <div className="cursor-pointer ml-3 leading-6">
            <label htmlFor="policy" className="font-medium text-gray-900">
              {t('Politica di cancellazione e rimborso')}
            </label>
            <p id="offers-description" className="text-gray-500">
              {t('confermo di aver preso visione della politica di cancellazione e rimborso per questa prenotazione')}
            </p>
            <ErrorBag error={errors.policy} />
          </div>
        </div>

        <button className="mt-4 font-bold bg-orange-600 text-white w-full rounded-md px-4 py-2">
          Accetta il preventivo
        </button>

        <div className="text-center text-slate-600 mt-4">
          {t('accettando il preventivo invierai una conferma di richiesta prenotazione alla struttura ricettiva. Dovrai quindi attendere la conferma prenotazione che ti sarà recapitata per email con le eventuali istruzioni per il pagamento')}
        </div>
      </form>
    </div>
  )

}
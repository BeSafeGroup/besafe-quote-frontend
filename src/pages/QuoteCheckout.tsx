import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchAccommodation, fetchAccommodationSettings, fetchQuoteById } from "../store/quoteSlice"
import QuoteHero from "../components/QuoteHero"
import QuoteFooter from "../components/QuoteFooter"
import CheckoutForm from "../components/CheckoutForm"
import CheckoutRecap from "../components/CheckoutRecap"
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export default function QuoteCheckout () {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const { quote } = useAppSelector(state => state.quote)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      dispatch(fetchQuoteById(id))
    }
  }, [ id ])

  useEffect(() => {
    if (quote && quote.idAccomodation) {
      dispatch(fetchAccommodation(quote.idAccomodation))
      dispatch(fetchAccommodationSettings(quote.idAccomodation))
    }
  }, [
    quote
  ])

  return (
    <div className="flex flex-col space-y-6 max-w-6xl p-6 mx-auto">
      <QuoteHero />

      <div>
        <button
          onClick={() => navigate(`/${quote?.idQuote}`)}
          className="flex items-center space-x-2 bg-white hover:bg-orange-600 hover:text-white text-orange-600 px-2 py-2 rounded-md">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          <div>Torna alle proposte</div>
        </button>
      </div>

      <div className="flex space-x-6">
        <CheckoutForm />
        <CheckoutRecap />
      </div>

      <QuoteFooter />
    </div>
  )

}
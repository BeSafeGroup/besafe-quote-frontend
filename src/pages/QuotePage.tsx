import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchAccommodation, fetchAccommodationSettings, fetchQuoteById } from "../store/quoteSlice"
import QuoteHero from "../components/QuoteHero"
import QuoteIntro from "../components/QuoteIntro"
import QuoteFooter from "../components/QuoteFooter"
import QuoteOptions from "../components/QuoteOptions"
import HotelMap from "../components/HotelMap"
import HotelItinerary from "../components/HotelItinerary"
import AccommodationAmenities from "../components/AccommodationAmenities"
import AiMessageBox from "../components/AiMessageBox"

export default function QuotePage () {

  const dispatch = useAppDispatch()
  
  const { quote, accommodationSettings } = useAppSelector(state => state.quote)
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
    <div className="p-6 flex flex-col max-w-3xl mx-auto">
      <AiMessageBox />
      <QuoteHero />
      <div className="flex flex-col space-y-6">
        <QuoteIntro />
        <QuoteOptions />
        <HotelMap />
        <AccommodationAmenities />
        <HotelItinerary />
        <QuoteFooter />
      </div>
    </div>
  )

}
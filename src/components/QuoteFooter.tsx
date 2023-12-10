import { useAppSelector } from "../hooks"

export default function QuoteFooter () {

  const { accommodation } = useAppSelector(state => state.quote)

  return (
    <footer className="text-slate-600">
      <div className="font-semibold">{accommodation?.accomodationName}</div>
      <div>{accommodation?.company.address?.addressStreet}, {accommodation?.company.address?.addressCity} - {accommodation?.company.address?.addressZipCode}</div>
    </footer>
  )
  
}
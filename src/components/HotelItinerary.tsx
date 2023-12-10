import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector, useSocket } from "../hooks"
import { classNames } from "../utils"
import { useTranslation } from "react-i18next"
import { fetchItinerary, setItinenary } from "../store/quoteSlice"
import Markdown from "react-markdown"

export default function HotelItinerary ({ unpadded } : { unpadded: boolean }) {

  const dispatch = useAppDispatch()
  const client = useSocket()
  const { t } = useTranslation()

  const [interest, setInterest] = useState<string[]>([])
  const { loading, quote, accommodation, itinerary } = useAppSelector(state => state.quote)

  useEffect(() => {
    if (client.connected && client && quote && quote.idQuote) {
      client.subscribe(`/topic/quote-${quote.idQuote}`, message => dispatch(setItinenary(message.body)))
    }
  }, [
    client, quote
  ])

  return (
    <div className="bg-white rounded-md">
      <div className={
        classNames(unpadded ? 'p-2 px-4' : 'px-6 pt-4 mb-4')
      }>
        <div className="text-xl font-bold text-slate-700">Idee per il tuo soggiorno?</div>
      </div>
      <div
        className={
          classNames(
            unpadded ? 'bg-slate-100 border-t border-b text-slate-700 font-medium px-4 py-2 relative' : 'bg-slate-100 border-t border-b text-slate-700 font-medium p-6 relative'
          )
        }>
        <div className="absolute bg-repeat z-10 top-0 left-0 w-full h-full opacity-5" style={{
          backgroundImage: 'url(https://img.freepik.com/free-vector/travel-pattern-background_23-2148043441.jpg?w=826&t=st=1701865866~exp=1701866466~hmac=46b27d40ab709ac608b0b85d7b4262eb91848dd53328b0f3643406b4e61d2fd1)'
        }} />
        
        <div className="relative z-10">
          {t('Possiamo generare un piccolo itinerario per il tuo soggiorno presso')} {accommodation?.accomodationName}, {t('seleziona i tuoi interessi')}:
          <div className={
            classNames(
              unpadded ? 'flex flex-wrap mt-4' : 'flex space-x-2 mt-4'
            )
          }>
            <button onClick={() => {
              if (!interest.includes(t('arte e musei'))) {
                setInterest([...interest, t('arte e musei')])
              } else {
                setInterest(interest.filter(i => i !== t('arte e musei')))
              }
            }} className={
              classNames(
                "rounded-full px-2 py-1 text-sm font-medium",
                interest.includes(t('arte e musei')) ? 'bg-orange-200 text-orange-700' : 'bg-slate-200',
                unpadded ? 'm-1' : ''
              )
            }>🖼️ {t('Arte e musei')}</button>
            <button onClick={() => {
              if (!interest.includes(t('cibo'))) {
                setInterest([...interest, t('cibo')])
              } else {
                setInterest(interest.filter(i => i !== t('cibo')))
              }
            }} className={
              classNames(
                "rounded-full px-2 py-1 text-sm font-medium0",
                interest.includes(t('cibo')) ? 'bg-orange-200 text-orange-700' : 'bg-slate-200',
                unpadded ? 'm-1' : ''
              )
            }>🍕 {t('Cibo locale')}</button>
            <button onClick={() => {
              if (!interest.includes(t('passeggiate'))) {
                setInterest([...interest, t('passeggiate')])
              } else {
                setInterest(interest.filter(i => i !== t('passeggiate')))
              }
            }} className={
              classNames(
                "rounded-full px-2 py-1 text-sm font-medium",
                interest.includes(t('passeggiate')) ? 'bg-orange-200 text-orange-700' : 'bg-slate-200',
                unpadded ? 'm-1' : ''
              )
            }>🚶‍♀️ {t('Passeggiate')}</button>
            <button onClick={() => {
              if (!interest.includes(t('rilassarsi'))) {
                setInterest([...interest, t('rilassarsi')])
              } else {
                setInterest(interest.filter(i => i !== t('rilassarsi')))
              }
            }} className={
              classNames(
                "rounded-full px-2 py-1 text-sm font-medium",
                interest.includes(t('rilassarsi')) ? 'bg-orange-200 text-orange-700' : 'bg-slate-200',
                unpadded ? 'm-1' : ''
              )
            }>💆 {t('Relax')}</button>
          </div>

          <button onClick={() => {
            if (quote && quote.idQuote) {
              dispatch(fetchItinerary({
                quoteId: quote.idQuote,
                interests: interest.join(', ')
              }))
            }
          }} className={
            classNames(
              'mt-6 bg-orange-600 text-white px-4 py-1 text-md flex space-x-2 items-center font-medium rounded-full',
              interest.length === 0 ? 'cursor-not-allowed opacity-50' : ''
            )
          }>
            <div>{t(`Immagina il tuo soggiorno`)}</div>
          </button>
        </div>
      </div>

      {
        loading.itinerary &&
        <div className="my-6 px-6 text-lg font-medium text-slate-600 flex flex-col items-center justify-center">
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <div className="loading">{t('Attendi, stiamo immaginando il tuo viaggio')}.</div>
          <div className="text-slate-500 mt-1 font-normal">{t('siamo alla ricerca delle migliori attività, potrebbe volerci 1 minuto!')}</div>
        </div>
      }

      {
        (!loading.itinerary && itinerary !== undefined) &&
        <Markdown className={'p-6 text-slate-600 gtp-content'}>
          {itinerary.result}
        </Markdown>
      }
    </div>
  )

}
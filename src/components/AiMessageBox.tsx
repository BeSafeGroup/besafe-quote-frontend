import { AnimatePresence, motion } from "framer-motion"
import { useAppSelector } from "../hooks"
import { useState } from "react"

export default function AiMessageBox () {

  const { accommodation } = useAppSelector(state => state.quote)
  const [viewTip, setViewTip] = useState(true)

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end justify-end">
      
      <AnimatePresence>
        {
          viewTip &&
          <motion.div initial={{ opacity: 0, left: 120 }} exit={{ opacity: 0, left: 120 }} animate={{ opacity: 1, left: 0 }} className="relative max-w-xs bg-white shadow-xl p-4 mb-6 rounded-md">
            <div>
              <div className="text-gray-600 font-semibold mb-2">🤓 Vuoi scoprire cosa ti aspetta?</div>
              <div className="text-slate-600 mb-2">
                grazie all'intelligenza artificiale possiamo darti dei suggerimenti per il tuo soggiorno presso
                {accommodation?.accomodationName} sulla base dei tuoi interessi!
              </div>
              <div className="flex space-x-4">
              <button className="text-orange-600 font-semibold">Inizia!</button>
              <button onClick={() => setViewTip(false)} className="text-slate-600 font-semibold">magari dopo</button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
      <div className="w-14 h-14 hover:scale-110 transition-all cursor-pointer bg-orange-600 rounded-full flex items-center justify-center text-white shadow-xl">
        <div className="text-md material-symbols-outlined">
          local_library
        </div>
      </div>

    </div>
  )
}
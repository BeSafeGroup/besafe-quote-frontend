import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useAppSelector } from '../hooks'

export default function HotelMap () {

  const { quote, accommodation } = useAppSelector(state => state.quote)

  if (!accommodation) return <></>

  return (
    <div className='w-full rounded-md overflow-hidden relative z-10'>
      <div className='bg-white absolute left-5 rounded-md shadow-md p-2 bottom-5' style={{ zIndex: 999 }}>
        <div className='text-slate-700 font-bold'>{accommodation.accomodationName}</div>
        <div className='text-slate-500 text-sm'>
          {accommodation.address.addressStreet}, {accommodation.address.addressCity} ({accommodation.address.addressZipCode})
        </div>
      </div>
      <MapContainer className='h-64 w-full' center={[
        accommodation?.company.address?.addressLatitude || 0,
        accommodation?.company.address?.addressLongitude || 0
        ]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          className='w-full'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[
          accommodation?.company.address?.addressLatitude || 0,
          accommodation?.company.address?.addressLongitude || 0
        ]}>
          <Popup>
            <strong>{accommodation?.accomodationName}</strong>
            <div>
              {accommodation?.company.address?.addressStreet}, {accommodation?.company.address?.addressCity}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )

}
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccommodationSettings, Accomodation, AccomodationAmenity, AccomodationInfo, ApiResponse, ItineraryResponse, Quote, QuoteOption, QuoteResponse } from '../types'
import { RootState } from '.'

interface CounterState {
  loading: {
    quote: boolean,
    settings: boolean,
    accommodation: boolean,
    itinerary: boolean,
    amenities: boolean,
    info: boolean
  }
  amenities?: AccomodationAmenity[],
  info?: AccomodationInfo,
  itinerary?: ItineraryResponse,
  accommodation?: Accomodation,
  quote?: Quote,
  acceptedInsurance: boolean,
  selectedOption?: QuoteOption,
  accommodationSettings?: AccommodationSettings
}

const initialState: CounterState = {
  loading: {
    itinerary: false,
    quote: false,
    settings: false,
    accommodation: false,
    amenities: false,
    info: false
  },
  amenities: undefined,
  info: undefined,
  acceptedInsurance: false,
  itinerary: undefined,
  selectedOption: undefined,
  accommodation: undefined,
  quote: undefined,
  accommodationSettings: undefined
}

export const postQuoteResponse = createAsyncThunk(
  'quote/postQuoteResponse',
  async (quoteResponse: QuoteResponse) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/response`, {
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(quoteResponse)
    })
    return (await response.json()) as ApiResponse<Accomodation>
  }
)

export const fetchAccommodation = createAsyncThunk(
  'quote/fetchAccommodation',
  async (accommodationId: number | string) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/accommodation-details/${accommodationId}`)
    return (await response.json()) as ApiResponse<Accomodation>
  }
)

export const fetchAccommodationSettings = createAsyncThunk(
  'quote/fetchAccommodationSettings',
  async (accommodationId: number | string) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/accommodation-settings/${accommodationId}`)
    return (await response.json()) as ApiResponse<AccommodationSettings>
  }
)

export const fetchAccomodationInfo = createAsyncThunk(
  'quote/fetchAccomodationInfo',
  async (accommodationId: number | string) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/accommodation-info/${accommodationId}`)
    return (await response.json()) as ApiResponse<AccomodationInfo>
  }
)

export const fetchAccomodationAmenities = createAsyncThunk(
  'quote/fetchAccomodationAmenities',
  async (accommodationId: number | string) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/accommodation-amenities/${accommodationId}`)
    return (await response.json()) as ApiResponse<AccomodationAmenity[]>
  }
)

export const fetchQuoteById = createAsyncThunk(
  'quote/fetchQuoteById',
  async (quoteId: number | string) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/${quoteId}`)
    // Inferred return type: Promise<MyData>
    return (await response.json()) as ApiResponse<Quote>
  }
)

export const fetchItinerary = createAsyncThunk(
  'quote/fetchItinerary',
  async ({quoteId, interests } : { quoteId: number | string, interests: string }) => {
    const response = await fetch(`http://localhost:8083/API/ext/quote/${quoteId}/itinerary?interests=${interests}`)
    // Inferred return type: Promise<MyData>
    return (await response.json()) as ApiResponse<ItineraryResponse>
  }
)

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setItinenary: (state, action: PayloadAction<string>) => {
      state.loading.itinerary = false
      state.itinerary = {
        completed: true,
        result: action.payload,
        prompt: ''
      }
    },
    setSelectedOption: (state, action: PayloadAction<QuoteOption>) => {
      state.selectedOption = action.payload
    },
    setAcceptedInsurance: (state, action: PayloadAction<boolean>) => {
      state.acceptedInsurance = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuoteById.pending, (state) => {
      state.loading.quote = true
    })
    builder.addCase(fetchQuoteById.fulfilled, (state, action) => {
      state.loading.quote = false
      state.quote = action.payload.data
      if (action.payload.data.besafeIncluded) {
        state.acceptedInsurance = true
      }
      if (action.payload.data.options.length === 1) {
        state.selectedOption = action.payload.data.options[0]
      }
      console.log(action.payload)
    })
    builder.addCase(fetchQuoteById.rejected, (state) => {
      state.loading.quote = false
    })

    builder.addCase(fetchAccommodationSettings.pending, (state) => {
      state.loading.settings = true
    })
    builder.addCase(fetchAccommodationSettings.fulfilled, (state, action) => {
      state.loading.settings = false
      state.accommodationSettings = action.payload.data
    })
    builder.addCase(fetchAccommodationSettings.rejected, (state) => {
      state.loading.settings = false
    })

    builder.addCase(fetchAccommodation.pending, (state) => {
      state.loading.accommodation = true
    })
    builder.addCase(fetchAccommodation.fulfilled, (state, action) => {
      state.loading.accommodation = false
      state.accommodation = action.payload.data
    })
    builder.addCase(fetchAccommodation.rejected, (state) => {
      state.loading.accommodation = false
    })

    builder.addCase(fetchItinerary.pending, (state) => {
      state.loading.itinerary = true
    })
    builder.addCase(fetchItinerary.rejected, (state) => {
      state.loading.itinerary = false
    })

    builder.addCase(fetchAccomodationAmenities.pending, (state) => {
      state.loading.amenities = true
    })
    builder.addCase(fetchAccomodationAmenities.fulfilled, (state, action) => {
      state.loading.amenities = false
      state.amenities = action.payload.data
    })
    builder.addCase(fetchAccomodationAmenities.rejected, (state) => {
      state.loading.amenities = false
    })

    builder.addCase(fetchAccomodationInfo.pending, (state) => {
      state.loading.info = true
    })
    builder.addCase(fetchAccomodationInfo.fulfilled, (state, action) => {
      state.loading.info = false
      state.info = action.payload.data
    })
    builder.addCase(fetchAccomodationInfo.rejected, (state) => {
      state.loading.info = false
    })
  }
})

export const insuranceCost = (state: RootState) => {
  if (state.quote.selectedOption && state.quote.quote) {
    const reservationTotal = state.quote.quote.options.map(i => i.rooms.map(r => r.price)).flat().reduce((prev, curr) => prev + curr)
    return reservationTotal * (state.quote.quote.insuranceRate + state.quote.quote.insuranceMarkup) / 100
  }
  return 0
}

export const quoteTotal = (state: RootState) => {
  if (state.quote.selectedOption && state.quote.quote) {
    const reservationTotal = state.quote.selectedOption.rooms.reduce((prev, curr) => prev + curr.price, 0)
    if (state.quote.acceptedInsurance) {
      return reservationTotal + insuranceCost(state)
    }
    return reservationTotal
  }
}

export const { setItinenary, setSelectedOption, setAcceptedInsurance } = quoteSlice.actions

export default quoteSlice.reducer
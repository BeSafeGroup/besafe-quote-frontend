export interface Quote {
  idQuote?: number,
  idQuoteCustomer?: number,
  firstName?: string,
  lastName?: string,
  lastViewAt?: number,
  email?: string,
  language: string,
  expiresAt?: number,
  idCancellationPolicy?: number,
  policyTitle?: string,
  policyText?: string,
  customer?: QuoteCustomer,
  insuranceRate: number,
  insuranceMarkup: number,
  message?: string,
  refundable: boolean,
  note?: string,
  insuranceProduct: string,
  notifiedAt?: number,
  acceptedAt?: number,
  rejectedAt?: number,
  rejectReason?: string,
  idAccomodation: number,
  besafeIncluded: boolean,
  askBilling: boolean,
  options: QuoteOption[]
}

export interface QuoteCustomer {
  idQuoteCustomer?: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  countryCode: string,
  email: string,
  target: string,
  idAccomodation: number
}

export interface QuoteOption {
  idQuoteOption: any,
  arrival: number,
  optionType: 'ROOM' | 'DESTINATION',
  departure: number,
  destination?: string,
  destinationTotal?: number,
  rooms: QuoteRoom[]
}

export interface QuoteRoom {
  idQuoteRoom?: any,
  title: string,
  idRoom?: number,
  idQuote?: number,
  imageUrl?: string,
  price: number,
  description: string,
  accepted: boolean,
  adults: number,
  children: number,
  room: {
    images: RoomImage[]
  }
}

export interface Translation {
  lang: string,
  type: string,
  value: string
}

export interface Room {
  idRoom?: number,
  name: string,
  translations?: Translation[],
  description: string,
  basePrice: number,
  imageUrl: string,
  idAccomodation: number
}

export interface OfferRoom {
  roomId: number,
  adults: number,
  children: number,
  price: number
}

export interface AccommodationSettings {
  idAccomodationSettings: number,
	logo: string,
	cover: string,
	idAccomodation: number
}

export interface ApiResponse<T> {
  code: string,
  message: string,
  data: T
}

export interface Accomodation {
  testMode?: boolean,
  opportunity: boolean,
  opportunitySendEmails: boolean,
  accomodationName: string,
  customerType: 'HOTEL' | 'TO' | 'AGENCY',
  generalNotificationEmail?: string,
  accomodationPhone: string,
  currency?: string,
  verificationNeeded: boolean,
  usePendingModel: boolean,
  address: Address,
  company: Company,
  idAccomodation: number,
  isActive: boolean,
  credits?: number,
  isSuspended: boolean
}

export interface Address {
  addressCity: string,
  addressLatitude: number,
  addressLongitude: number,
  addressState: string,
  addressStreet: string,
  addressZipCode: string,
  addressProvince: string,
  idAddress?: number,
  idCountry: number,
  country?: Country
}

export interface Country {
  countryAlpha2: string,
  countryName: string,
  idCountry: number,
  isActive: true
}

export interface Company {
  companyEmail: string,
  companyFiscalCode: string,
  companyName: string,
  companyPec: string,
  companyVat: string,
  companySdi: string,
  createdAt: number,
  deletedAt?: number,
  idCompany?: number,
  updatedAt: number,
  address?: Address
}

export interface ItineraryResponse {
  completed: boolean,
  prompt: string,
  result: string
}

export interface RoomImage {
  idRoomImage?: number,
  imageUrl: string,
  description: string,
  idRoom?: number
}

export interface QuoteResponse {
  idQuote?: number,
  accepted: boolean,
  insuranceAccepted: boolean,
  insuranceCost: number,
  quoteTotal: number,
  customerAddress: string,
  customerEmail: string,
  customerZipCode: string,
  customerPhone: string,
  customerCountryCode: string
}

export interface AccomodationAmenity {
  idAccomodationAmenity: number,
  idAccomodation: number,
  amenityDescription: string,
  amenityKey: string,
  category: string
}

export interface AccomodationInfo {
  idAccomodationInformation: number,
  checkIn: string,
  checkOut: string,
  description: string,
  petsAllowed: boolean,
  petsCost: number,
  childrenMaxAge: number,
  idAccomodation: number
}
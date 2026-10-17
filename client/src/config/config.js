// Placeholders: replace before launch.
export const API_URL = 'http://localhost:5000/api'
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || '' // country code + number, no "+"
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL?.trim() || ''
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || ''
export const SUPPORT_PHONE = import.meta.env.VITE_SUPPORT_PHONE?.trim() || ''
export const BUSINESS_ADDRESS = import.meta.env.VITE_BUSINESS_ADDRESS?.trim() || ''
export const BUSINESS_HOURS = import.meta.env.VITE_BUSINESS_HOURS?.trim() || ''
export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || ''
export const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT?.trim() || ''
export const AUTH_LOGIN_ENDPOINT = import.meta.env.VITE_AUTH_LOGIN_ENDPOINT?.trim() || ''
export const AUTH_REGISTER_ENDPOINT = import.meta.env.VITE_AUTH_REGISTER_ENDPOINT?.trim() || ''
export const AUTH_RESET_ENDPOINT = import.meta.env.VITE_AUTH_RESET_ENDPOINT?.trim() || ''
export const ORDER_ENDPOINT = import.meta.env.VITE_ORDER_ENDPOINT?.trim() || ''
export const FREE_DELIVERY_ABOVE = 499
export const DELIVERY_CHARGE = 49 // estimate only; real rates come from shipping integration

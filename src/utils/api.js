import axios from 'axios'
import env from '@/config/env'
import { getSession } from 'next-auth/react'

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

const apiClient = axios.create({
    baseURL: `${env.BACKEND_URL}/api/`,
    headers,
})

export default apiClient

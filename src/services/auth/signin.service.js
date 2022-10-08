import apiClient from '@/lib/axios'

const fetchSignin = async payload => {
    const { data } = await apiClient.post('/login', payload)

    return data
}

export default fetchSignin

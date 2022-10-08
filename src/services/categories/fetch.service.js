import axios from '@/lib/axios'

export const fetchCategories = async () => {
    const { data } = await axios.get('/api/categories')
    return data
}

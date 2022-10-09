import Seo from '@/components/Seo'
import { slugify } from '@/helpers/slugify'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import Router from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

const CreateProduct = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-FqT-poQMtc0ThD1gpEYrVqE_yJk--w-ig&usqp=CAU',
        price: 0,
        category_id: 0,
        stock: 0,
        user_id: user?.id,
    })
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const PUBLISHED_AT = Date.now()

    const onSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/products', formData)
            Router.push('/product')
        } catch (error) {
            console.log(error, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="p-6">
            <Seo templateTitle="Create Product" />
            <div className="max-w-5xl mx-auto">
                <section className="w-full space-y-4 ">
                    <input
                        // {...register('user_id', { required: true })}
                        type={'hidden'}
                        value={user?.id}
                    />

                    <div className="w-full">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="name">
                            Product Name
                        </label>
                        <input
                            // {...register('name', { required: true })}
                            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="name"
                            type="text"
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    name: e.target.value,
                                    slug: slugify(e.target.value),
                                }))
                            }}
                            value={formData.name}
                            placeholder="Product name..."
                        />
                        {/* {errors.name && (
                            <p className="text-red-600 text-sm">Required</p>
                        )} */}
                    </div>
                    {/* <input type={'hidden'} value={slugify(formData.name)} /> */}
                    <div className="w-full">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="description">
                            Description
                        </label>
                        <input
                            // {...register('description', { required: true })}
                            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="description"
                            type="text"
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    description: e.target.value,
                                }))
                            }}
                            value={formData.description}
                            placeholder="Product description..."
                        />
                        {/* {errors.description && (
                            <p className="text-red-600 text-sm">Required</p>
                        )} */}
                    </div>
                    <div className="w-full">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="price">
                            Price
                        </label>
                        <input
                            // {...register('price', { required: true })}
                            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="price"
                            type="number"
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    price: e.target.value,
                                }))
                            }}
                            value={formData.price}
                            placeholder="Product price..."
                        />
                        {/* {errors.price && (
                            <p className="text-red-600 text-sm">Required</p>
                        )} */}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="stock">
                                Stock
                            </label>
                            <input
                                // {...register('stock', { required: true })}
                                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="stock"
                                type="number"
                                onChange={e => {
                                    setFormData(prevState => ({
                                        ...prevState,
                                        stock: e.target.value,
                                    }))
                                }}
                                value={formData.stock}
                                placeholder="Product stock..."
                            />
                            {/* {errors.stock && (
                                <p className="text-red-600 text-sm">Required</p>
                            )} */}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="category">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            ...prevState,
                                            category_id: e.target.value,
                                        }))
                                    }}
                                    value={formData.category_id}
                                    // {...register('category_id', {
                                    //     required: true,
                                    // })}
                                    className="block appearance-none w-full bg-gray-100 border border-gray-100 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="category">
                                    <option value={1}>New Mexico</option>
                                    <option value={2}>Missouri</option>
                                    <option value={3}>Texas</option>
                                </select>
                                {/* {errors.category_id && (
                                    <p className="text-red-600 text-sm">
                                        Required
                                    </p>
                                )} */}
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-zip">
                                Published At
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-zip"
                                type="text"
                                value={PUBLISHED_AT}
                                disabled
                                placeholder="Published At"
                            />
                        </div>
                    </div>
                    <button
                        onClick={onSubmit}
                        className={
                            'focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none'
                        }>
                        Submit
                    </button>
                </section>
            </div>
        </section>
    )
}

export default CreateProduct

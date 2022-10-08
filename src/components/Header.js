import React from 'react'
import Image from 'next/image'
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { useSelector } from 'react-redux'
import { selectItems } from '@/slices/basketSlice'

function Header() {
    const { user } = useAuth({ middleware: 'guest' })
    const router = useRouter()
    const items = useSelector(selectItems)
    return (
        <header>
            {/* Top Nav */}
            <section className="flex items-center bg-dropzhip_blue p-1 flex-grow justify-between py-2">
                <div className="flex items-center justify-center w-24 h-12">
                    <Image
                        onClick={() => router.push('/')}
                        src="/logo.png"
                        width={160}
                        height={80}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>
                <div className="bg-blue-900 hover:bg-blue-800 hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
                    <input
                        type={'text'}
                        placeholder="Search..."
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
                    />
                    <SearchIcon className="h-12 p-4 text-white" />
                </div>
                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div
                        className="link cursor-pointer"
                        onClick={() => router.push('/dashboard')}>
                        <p>{user ? `Hello, ${user.name}` : 'Sign In'}</p>
                        <p className="font-extrabold md:text-sm">
                            Account & Lists
                        </p>
                    </div>
                    <div
                        className="link"
                        onClick={() => router.push('/orders')}>
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div
                        className="link relative flex items-center"
                        onClick={() => router.push('/checkout')}>
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-blue-900 rounded-full text-white font-bold text-center">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm">
                            Basket
                        </p>
                    </div>
                </div>
            </section>
            {/* Bottom Nav */}
            <section className="flex items-center space-x-3 p-2 pl-5 bg-dropzhip_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">DropZhip Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">
                    Health & Personal Care
                </p>
            </section>
        </header>
    )
}

export default Header

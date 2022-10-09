import Dropdown from '@/components/Core/Dropdown'
import { DropdownButton } from '@/components/Core/DropdownLink'
import Tooltip from '@/components/Core/Tooltip'
import { useAuth } from '@/hooks/auth'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactSVG } from 'react-svg'

const routeWithourSidebar = ['/alerts']

const menuItems = [
    {
        href: '/dashboard',
        title: 'Dashboard',
        Icon: 'Grid.svg',
    },
    {
        href: '/product/',
        title: 'Products',
        Icon: 'Product.svg',
    },
    {
        href: '/report',
        title: 'Reports',
        Icon: 'Report.svg',
    },
]

const routeWithoutLayout = [
    '/users',
    '/users/add',
    '/users/add/app-activation',
    '/users/[id]',
    '/users/[id]/user-setting',
    '/users/[id]/profile',
    '/users/[id]/profile/manage',
    '/users/[id]/subscription',
    '/users/[id]/contact',
    '/users/[id]/password',
    '/users/[id]/password/change',
    '/users/[id]/settings',
    '/users/[id]/settings/app/[application_id]',
    '/notifications',
    '/account',
    '/account/profile',
    '/account/profile/manage',
    '/account/subscription',
    '/account/password',
    '/account/password/change',
    '/account/contact',
    '/account/contact/change-phone-number',
    '/account/settings',
    '/account/settings/app/[app_id]',
]

const Layout = ({ children }) => {
    // Hooks
    const router = useRouter()
    const dispatch = useDispatch()

    const { logout } = useAuth()
    const { user } = useAuth({ middleware: 'auth' })

    const firstPath = router.pathname.split('/')[1]

    // redux
    // const menuBarOpen = useSelector(selectSidebarOpen)

    // UI State
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <section className="min-h-screen">
            <div className="flex flex-1">
                {!routeWithoutLayout.includes(router.pathname) && (
                    <aside className="bg-dropzhip_blue w-[86px] md:w-20 h-screen sticky z-10 top-0 text-base-100 font-medium text-[10px]">
                        <nav className="flex flex-col justify-between h-full">
                            <ul>
                                {menuItems.map(({ href, title, Icon }) => (
                                    <li className="m-2" key={title}>
                                        <Link href={href}>
                                            <a
                                                className={`flex flex-col gap-1 items-center text-white p-2 rounded hover:bg-blue-900 hover:text-base-100 transition-colors ease-in duration-200 cursor-pointer ${
                                                    firstPath ===
                                                        href.split('/')[1] &&
                                                    'bg-blue-900 text-white'
                                                }`}>
                                                <ReactSVG
                                                    src={`/icons/line/${Icon}`}
                                                    color="white"
                                                    wrapper="svg"
                                                    height={20}
                                                    width={20}
                                                />
                                                {title}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                )}
                <main className="flex flex-col flex-1 min-h-screen">
                    <header className="bg-white sticky top-0 h-16 flex justify-between items-center font-medium text-sub3 text-base-900 py-5 px-6 z-10 shadow-md">
                        <p>
                            <img
                                src="/logo.png"
                                className="mx-auto h-10 w-10"
                                alt="Dropzhip Indonesia"
                            />
                        </p>
                        <div className="flex items-center">
                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <Dropdown
                                    align="right"
                                    width="48"
                                    trigger={
                                        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                            <div>{user?.name}</div>

                                            <div className="ml-1">
                                                <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    }>
                                    {/* Authentication */}
                                    <DropdownButton
                                        onClick={() =>
                                            alert('Fun is not implemeted')
                                        }>
                                        My Profile
                                    </DropdownButton>
                                    <DropdownButton
                                        onClick={() =>
                                            alert('Fun is not implemeted')
                                        }>
                                        Settings
                                    </DropdownButton>
                                    <DropdownButton onClick={logout}>
                                        Logout
                                    </DropdownButton>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-6 py-1">
                                {loading ? (
                                    <div className="flex items-center bg-[#F0F2F5] px-3 py-2 rounded-lg">
                                        <div className="mr-1">
                                            <ReactSVG
                                                width={24}
                                                height={24}
                                                wrapper="svg"
                                                src="/icons/duotone/Download.svg"
                                            />
                                        </div>
                                        <h1 className="text-base-900 text-sm font-medium">
                                            Synchronization...
                                        </h1>
                                    </div>
                                ) : (
                                    <div className="flex items-center bg-[#F0F2F5] px-3 py-2 rounded-lg">
                                        <div className="mr-1">
                                            <ReactSVG
                                                width={24}
                                                height={24}
                                                wrapper="svg"
                                                src="/icons/duotone/Download.svg"
                                            />
                                        </div>
                                        <div className="text-sm font-medium">
                                            Last sync :{' '}
                                            {format(
                                                new Date(),
                                                'd MMM yyyy, HH:mm:ss',
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <Tooltip
                                    placement="bottom"
                                    className="text-sub3 text-base-100 !py-1 !px-2 !rounded bg-backgroundDark-200 whitespace-nowrap !mt-2"
                                    classPolygon="!h-[12px] !rounded-sm !-top-[4px] -translate-y-1/2"
                                    content="Help">
                                    <div className="hover:bg-base-200 p-1 rounded-lg cursor-pointer">
                                        <p>Help</p>
                                    </div>
                                </Tooltip>

                                {/* <AccountUsageDropdown />
                <NotificationDropdown />
                <ApplicationDropdown />
                <AccountDropdown /> */}
                            </div>
                        </div>
                    </header>
                    <div className="flex-auto">{children}</div>
                </main>
            </div>
        </section>
    )
}

export default Layout

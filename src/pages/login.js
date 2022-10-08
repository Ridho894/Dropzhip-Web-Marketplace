import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Core/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Core/Input'
import Label from '@/components/Core/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Seo from '@/components/Seo'
import { signIn } from 'next-auth/react'
import Cookies from 'js-cookie'
import fetchSignin from '@/services/auth/signin.service'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    // const onSubmit = async data => {
    //     setLoading(true)
    //     const result = await signIn('credentials', {
    //         redirect: false,
    //         email: data.email,
    //         password: data.password,
    //     })
    //     if (!result?.ok) {
    //         setErrors(true)
    //         setLoading(false)
    //         return
    //     }
    //     let bcrypt = require('bcryptjs')
    //     let salt = bcrypt.genSaltSync(10)
    //     let hash = bcrypt.hashSync(data.password, salt)

    //     Cookies.set('dropzhip_indonesia', hash)
    //     storage.removeItem('persist:root')
    //     const { user } = await fetchSignin({
    //         email: data.email,
    //         password: data.password,
    //     })
    //     if (user) {
    //         return router.push('/dashboard')
    //     }
    // }

    const submitForm = async event => {
        event.preventDefault()

        login({ email, password, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <Seo templateTitle="Login" />

            <AuthCard logo={<Image src="/logo.png" width={100} height={100} />}>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link href="/forgot-password">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </a>
                        </Link>

                        <Button className="ml-3 bg-dropzhip_blue">Login</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login

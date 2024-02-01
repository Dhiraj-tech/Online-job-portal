import { useState } from "react"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { intoStorage, setInState } from "../lib"
import http from "../http"
import { useDispatch } from "react-redux"
import { setUser } from "../store"
import { toast } from "react-toastify"

export const Login = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [remember, setRemember] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)


        http.post('/login', form)
            .then(({data}) => {
                if(['Customer'].includes(data.user.type)){
                    intoStorage('user_token', data.token, remember)
                    dispatch(setUser(data.user))
                    navigate('/')
                }else{
                    toast.error('Access denied')
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }


    return <section className="bg-auth">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12">
                <div className="card auth-box">
                    <div className="row g-0">
                        <div className="col-lg-6 text-center">
                            <div className="card-body p-4">
                            <h2 className="fw-bold">NepalJobHub</h2>
                                <div className="mt-5">
                                    <img src="sign-in.png" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="auth-content card-body p-5 h-100 text-white">
                                <div className="w-100">
                                    <div className="text-center mb-4">
                                        <h5>Welcome Back !</h5>
                                        <p className="text-white-70">Sign in to continue to NepalJobHub.</p>
                                    </div>
                                    <Form onSubmit={handleSubmit} className="auth-form">
                                        <div className="mb-3">
                                            <Form.Label htmlFor="email" className="form-label">Email</Form.Label>
                                            <Form.Control type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={e => setInState
                                            (e, form, setForm)} required /> 
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="password" className="form-label">Password</Form.Label>
                                            <Form.Control type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={e => setInState
                                            (e, form, setForm)} required />
                                        </div>
                                        <div className="mb-4">
                                            <div className="mb-3 form-check">
                                                <Form.Check.Input id="remember" checked=
                                                {remember} onChange={ev => setRemember(ev.
                                                target.checked)} />
                                                <Form.Check.Label htmlFor="remember">
                                                    Remember Me
                                                </Form.Check.Label>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn 
                                            btn-dark w-100" disabled={loading}>
                                                {loading ? <i className="fa-solid
                                                fa-spinner fa-spin me-2"></i> : null } 
                                                Login
                                            </button>
                        </div>
                                    </Form>
                                    <div className="mt-4 text-center">
                                        <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-medium text-white text-decoration-underline"> Sign Up </Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
}



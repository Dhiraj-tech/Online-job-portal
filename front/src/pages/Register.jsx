import { useState } from "react"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { setInState } from "../lib"
import http from "../http"

export const Register = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('https://online-job-portal-eq0e.onrender.com/register', form)
            .then(() => navigate('/login'))
            .catch(() => {})
            .finally(() => setLoading(false))
    }


    return <section className="bg-auth">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-11 col-lg-12">
                <div className="card auth-box">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center">
                            <div className="card-body p-4">
                            <h2 className="fw-bold">NepalJobHub</h2>
                                <div className="mt-5">
                                    <img src="sign-up.png" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="auth-content card-body p-5 text-white">
                                <div className="w-100" id="items-to-up">
                                    <div className="text-center">
                                        <h5>Let's Get Started</h5>
                                        <p className="text-white-70">Sign Up and get access to all the features of NepalJobHub</p>
                                    </div>
                                    <Form onSubmit={handleSubmit} className="auth-form">
                                        <div className="mb-3">
                                            <Form.Label htmlFor="name" className="form-label">Username</Form.Label>
                                            <Form.Control className="form-control" id="name" name="name"  
                                            placeholder="Enter your username" onChange={e => setInState
                                            (e, form, setForm)} required />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="email" className="form-label">Email</Form.Label>
                                            <Form.Control type="email" className="form-control" id="email" name="email"  
                                            placeholder="Enter your email" onChange={e => setInState
                                            (e, form, setForm)} required />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="password" className="form-label">Password</Form.Label>
                                            <Form.Control type="password" className="form-control" id="password" name="password"  
                                            placeholder="Enter your password" onChange={e => setInState
                                            (e, form, setForm)} required/>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="confirm_password" className="form-label">Confirm Password</Form.Label>
                                            <Form.Control type="password" className="form-control" id="confirm_password" name="confirm_password"  
                                            placeholder="Enter your confirm-password" onChange={e => setInState
                                            (e, form, setForm)} required/>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="bio" className="form-label">Bio</Form.Label>
                                            <textarea className="form-control" id="bio" name="bio"  
                                            placeholder="Enter your username" onChange={e => setInState
                                            (e, form, setForm)} required />
                                        </div>
                                        
                                        <div className="mb-4">
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                                <Form.Check.Label className="form-check-label" htmlFor="remember">I agree to the <Link to="/termscon" 
                                                className="text-white text-decoration-underline">Terms and conditions</Link></Form.Check.Label>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                                                {loading ? <i className="fa-solid
                                                fa-spinner fa-spin me-2"></i> : null }
                                                Register
                                            </button>
                                        </div>

                                    </Form>
                                    <div className="mt-3 text-center">
                                        <p className="mb-0">Already a member ? <Link to="/login" className="fw-medium text-white text-decoration-underline"> Sign In </Link></p>
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
import {  useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { clearStorage, setInState } from "../lib"
import http  from "../http"
import { SubmitButton } from "../components"
import { useDispatch } from "react-redux"
import { clearUser } from "../store"
import { toast } from "react-toastify"

export const ChangePassword = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('https://online-job-portal-cwo9.onrender.com/profile/change-password', form)
            .then(() => {
                dispatch(clearUser())
                clearStorage('cms_token')
                window.location.replace("/login");
                toast.info('Your password has been changed. Please log in again')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="mx-auto">
                    <h1>Change Password</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="6" className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="password">Old Password</Form.Label>
                            <Form.Control type="password" name="old_password" 
                            id="old_password"onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="new_password">New Password</Form.Label>
                            <Form.Control type="password" name="new_password" 
                            id="new_password"onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="confirm_password">Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirm_password" 
                            id="confirm_password"onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        
                        <div className="mb-3">
                            <SubmitButton loading={loading} icon="fa-save" 
                            label="Save" />  
                        </div>


                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}

import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { empty, setInState } from "../lib"
import http  from "../http"
import { setUser } from "../store"
import { SubmitButton } from "../components"

export const EditProfile = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const user = useSelector(st => st.user.value)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!empty(user)){
            setForm({
                name: user.name,
                email: user.email,
                bio: user.bio
            })
        }
    }, [user])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/edit-profile', form)
            .then(() => http.get('profile/details'))
            .then(({data}) =>{
                dispatch(setUser(data))
            })
            .catch(() =>{})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="text-center mx-auto">
                    <h1>Edit Profile</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="6" className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control name="name" id="name" defaultValue={form.name}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control name="email" id="email" defaultValue={user?.email}
                            readOnly plaintext/>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="bio">Bio</Form.Label>
                            <textarea className="form-control" name="bio" id="bio" defaultValue={form.bio}
                            onChange={ev => setInState(ev, form, setForm)}
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

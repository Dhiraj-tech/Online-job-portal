import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Loading, SubmitButton } from "../../components"
import { setInState } from "../../lib"
import { useState } from "react"
import http from "../../http"
import "react-quill/dist/quill.snow.css"

export const create = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()

    const handleFileChange = ev => {
        setForm({
            ...form,
            files: ev.target.files,
        })
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        let fd = new FormData()
        for(let k in form){
            if(k == 'files'){
                for(let file of form.files){
                    fd.append(`files`, file)
                }
            }else{
                fd.append(k, form[k])
            }
            
        }

        http.post('cms/applieds', fd, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                navigate('/applieds')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))

    }


    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="9" className="mx-auto">
                    <h1>Apply for the job</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="9" className="mx-auto">
                {loadingPage ? <Loading /> :<Form onSubmit={handleSubmit}>
                <div className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control name="name" id="name" placeholder="Enter your name"
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Email Address</Form.Label>
                            <Form.Control name="email" id="email" placeholder="Enter your email" onChange={ev => 
                            setInState(ev, form, setForm)} required/>
                        </div>
                        
                        <div className="mb-3">
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <textarea className="form-control" name="message" id="message" placeholder="Enter your message"
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        
                        
                        <div className="mb-3">
                            <Form.Label htmlFor="files">Resume Upload</Form.Label>
                            <Form.Control type="file" name="files" id="files"  
                            accept="application/pdf" onChange={handleFileChange} required multiple/>
                        </div>
  
                        <div className="mb-3">
                            <SubmitButton loading={loading} icon="fa-save" 
                            label="Save" />  
                        </div>


                    </Form>}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}
import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Loading, SubmitButton } from "../../components"
import { empty, setInState } from "../../lib"
import { useEffect, useState } from "react"
import http from "../../http"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const create = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [previews, setPreviews] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        if(!empty(form.files)){
            let list = []

            for(let file of form.files){
                list.push(URL.createObjectURL(file))
            }

            setPreviews(list)

        } 
    }, [form.files])


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

        http.post('cms/blogs', fd, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                navigate('/blogs')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))

    }


    const handleQuill = (data, title) => {
        setForm({
            ...form,
            [title]:data
        })
    }


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }
 
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'color', 'background',
        'font',
        'align',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]



    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="9" className="mx-auto">
                    <h1>Add Blog</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="9" className="mx-auto">
                {loadingPage ? <Loading /> :<Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="title">Blog title</Form.Label>
                            <Form.Control name="title" id="title" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        
                        <div className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <ReactQuill theme="snow" modules={modules} formats={formats} 
                            name="description" id="description" onChange={data => 
                            handleQuill(data, 'description')} required />
                        </div>
                        
                        
                        <div className="mb-3">
                            <Form.Label htmlFor="files">Images</Form.Label>
                            <Form.Control type="file" accept="image/*" name="files" id="files" 
                            onChange={handleFileChange} required multiple/>
                            <Row>
                                {previews.map((preview, i) => <Col key={i} sm="3"
                                className="mt-3">
                                    <img src={preview} className="img-fluid" id="blog-create" />
                                </Col>)}
                            </Row>
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
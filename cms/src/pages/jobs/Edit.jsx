import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { empty, setInState } from "../../lib"
import http  from "../../http"
import { Loading, SubmitButton } from "../../components"
import { useNavigate, useParams } from "react-router-dom"
import slugify from "slugify"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { confirmAlert } from "react-confirm-alert"

export const Edit = () => {

    const [form, setForm] = useState({})
    const [job, setJob] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [previews, setPreviews] = useState([])
    
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if(!empty(form.files)){
            let list = []

            for(let file of form.files){
                list.push(URL.createObjectURL(file))
            }

            setPreviews(list)

        } 
    }, [form.files])

    useEffect(() => {
        if (!empty(job)){
            setForm({
                title: job.title,
                experience: job.experience,
                location: job.location,
                description: job.description,
                category_id: job.category_id,
                company_id: job.company_id,
                qualification: job.qualification,
                offersalary: job.offersalary, 
                images: job.images,
                status: job.status,
            })
        }
    }, [job])

    useEffect(() => {
        if(form && form.name && form.name.length){
            const slug = slugify(form.name, {lower: true, remove: /[*+~.()'"!:@]/g })
            setForm({
                ...form,
                slug
            })
        }
    }, [form.name])

    const loadData = async () => {
        setLoadingPage(true)
    
    try{
        let catList = await http.get('cms/categories')
        setCategories(catList.data)

        let companyList = await http.get('cms/companies')
        setCompanies(companyList.data)
        
        let prod = await http.get(`cms/jobs/${params.id}`)
        setJob(prod.data)

    }catch(error) { }
        
    setLoadingPage(false)

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
                fd.append(k, typeof form[k] == 'undefined' ? '' : form[k])
            }
            
        }

        http.patch(`cms/jobs/${job._id}`, fd, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                navigate('/jobs')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))

    
    }        

    const handleFileChange = ev => {
        setForm({
            ...form,
            files: ev.target.files,
        })
    }

    const handleImgDelete = filename => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { 
                        setLoading(true)
                        http.delete(`cms/jobs/${job._id}/image/${filename.split('\\').
                        pop()}`)
                            .then(() => loadData())
                            .catch(() => { })
                            .finally(() => setLoading(false)) 
                    }
                },
                {
                    label:'No',
                    onClick: () => { }
                }
            ]
        })
    }


    const handleQuill = (data, name) => {
        setForm({
            ...form,
            [name]:data
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
                    <h1>Edit Job</h1>
                </Col>
            </Row>
            <Row>
            <Col sm="9" className="mx-auto">
                {loadingPage ? <Loading /> :<Form onSubmit={handleSubmit}>
                <div className="mb-3">
                            <Form.Label htmlFor="title">Job title</Form.Label>
                            <Form.Control name="title" id="title" defaultValue={form.title}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="experience">Job experience</Form.Label>
                            <Form.Control name="experience" id="experience" defaultValue={form.experience}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="location">Job location</Form.Label>
                            <Form.Control name="location" id="location" defaultValue={form.location}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>

                        
                        <div className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <ReactQuill theme="snow" modules={modules} formats={formats} 
                            name="description" id="description" value={form.description} 
                            onChange={data => handleQuill(data, 'description')} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <Form.Select name="status" id="status" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.status} required>
                                <option value="true" >Active</option>
                                <option value="false" >Inactive</option>
                            </Form.Select>
                        </div>

                       
                        <div className="mb-3">
                            <Form.Label htmlFor="category_id">Category</Form.Label>
                            <Form.Select name="category_id" id="category_id" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.category_id}
                            required>
                                {categories.map(category => <option value={category._id}
                                key={category._id}>{category.name}</option>)}

                            </Form.Select>
                        </div>

                        <div className="mb-3">
                            <Form.Label htmlFor="company_id">Company</Form.Label>
                            <Form.Select name="company_id" id="company_id" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.company_id}
                            required>
                                {companies.map(company => <option value={company._id}
                                key={company._id}>{company.name}</option>)}

                            </Form.Select>
                        </div>
                       
                        <div className="mb-3">
                            <Form.Label htmlFor="qualification">Job qualification</Form.Label>
                            <Form.Control name="qualification" id="qualification" defaultValue={form.qualification}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="offersalary">Offer salary</Form.Label>
                            <Form.Control name="offersalary" id="offersalary" defaultValue={form.offersalary}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        
                        
                        <div className="mb-3">
                            <Form.Label htmlFor="files">Images</Form.Label>
                            <Form.Control type="file" accept="image/*" name="files" id="files" 
                            onChange={handleFileChange} multiple/>
                            <Row>
                                {previews.map((preview, i) => <Col key={i} sm="3"
                                className="mt-3">
                                    <img src={preview} className="img-fluid" id="job-create" />
                                </Col>)}
                            </Row>
                            <Row>
                                {Object.keys(job).length && job.hasOwnProperty
                                ('images') ? job.images.map((img, i) => <Col key={i} sm="3"
                                className="mt-3">
                                    <Row>
                                        <Col xs="12">
                                            <img src={`${import.meta.env.VITE_API_URL}/${img}`} className="img-fluid" id="job-create" />
                                        </Col>
                                        <Col xs="12" className="mt-3 text-center">
                                            <Button type="button" variant="danger" 
                                            size="sm" onClick={() => handleImgDelete(img)}>
                                                <i className="fa-solid fa-trash me-2"></i>Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>): null}
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

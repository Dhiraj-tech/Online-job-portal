import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Loading, SubmitButton } from "../../components"
import { empty, setInState } from "../../lib"
import { useEffect, useState } from "react"
import http from "../../http"
import slugify from "slugify"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const create = () => {

    const [form, setForm] = useState({status: 'true', featured:'false'})
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [loadingPage, setLoadingPage] = useState(false)
    const [previews, setPreviews] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const LoadData = async () => {
            setLoadingPage(true)
        
        try{
            let catId, companyId
            let catList = await http.get('cms/categories')
            setCategories(catList.data)
            if(catList.data.length){
                catId = catList.data[0]._id
            }

            let companyList = await http.get('cms/companies')
            setCompanies(companyList.data)
            if(companyList.data.length){
                companyId = companyList.data[0]._id
            }

            setForm({
                ...form,
                category_id: catId,
                company_id: companyId
            })

        }catch(error) { }
            
        setLoadingPage(false)

        }

        LoadData()
    
    }, [])

    useEffect(() => {
        if(form && form.name && form.name.length){
            const slug = slugify(form.name, {lower: true, remove: /[*+~.()'"!:@]/g })
            setForm({
                ...form,
                slug
            })
        }
    }, [form.name])

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

        http.post('cms/jobs', fd, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                navigate('/jobs')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))

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
                    <h1>Add Job</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="9" className="mx-auto">
                {loadingPage ? <Loading /> :<Form onSubmit={handleSubmit}>
                <div className="mb-3">
                            <Form.Label htmlFor="title">Job title</Form.Label>
                            <Form.Control name="title" id="title" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="experience">Job experience</Form.Label>
                            <Form.Control name="experience" id="experience" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="location">Job location</Form.Label>
                            <Form.Control name="location" id="location" 
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
                            <Form.Control name="qualification" id="qualification" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="offersalary">Offer salary</Form.Label>
                            <Form.Control name="offersalary" id="offersalary" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        
                        <div className="mb-3">
                            <Form.Label htmlFor="files">Images</Form.Label>
                            <Form.Control type="file" accept="image/*" name="files" id="files" 
                            onChange={handleFileChange} required multiple/>
                            <Row>
                                {previews.map((preview, i) => <Col key={i} sm="3"
                                className="mt-3">
                                    <img src={preview} className="img-fluid" id="job-create" />
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
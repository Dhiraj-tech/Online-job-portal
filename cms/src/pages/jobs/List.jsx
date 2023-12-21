import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat, imgUrl } from "../../lib"

export const List = () => {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/jobs')
        .then(({data}) => setJobs(data))
        .catch(() => { })
        .finally(() => setLoading(false))

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { 
                        setLoading(true)
                        http.delete(`cms/jobs/${id}`)
                            .then(() => loadData())
                            .catch(() => {})
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

    return <Container fluid className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col>
                    <h1>Jobs</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/jobs/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Job
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Job title', 'Experience', 'Location','Description', 
                        'Category', 'Company','Qualification', 'Offer salary', 'Status', 'Created At', 'Updated At']} sortable={
                        ['Job title', 'Experience', 'Location','Description', 
                        'Category', 'Company', 'Qualification', 'Offer salary', 'Created At', 'Updated At']} data={jobs.map(job => {
                            return {
                                'Job title': job.title,
                                'Experience': job.experience,
                                'Location': job.location,
                                'Description': job.description, 
                                'Category': job.category[0].name,
                                'Company': job.company[0].name,
                                'Qualification': job.qualification,
                                'Offer salary': job.offersalary,
                                'Image':<a href={imgUrl(job.images.at(0))} 
                                 target= "_blank">
                                        <img src={imgUrl(job.images.at(0))}  
                                        className="img-small" id="job-list" />
                                    </a>,
                                'Status': job.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(job.createdAt),
                                'Updated At': dtFormat(job.updatedAt),
                                'Actions': <>
                                    <Link to={`/jobs/${job._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(job._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                                </>
                            }
                        })} /> }
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}
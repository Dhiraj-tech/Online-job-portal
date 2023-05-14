import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat, resumeUrl } from "../../lib"

export const List = () => {

    const [applieds, setApplieds] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/applieds')
        .then(({data}) => setApplieds(data))
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
                        http.delete(`cms/applieds/${id}`)
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

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col>
                    <h1>Jobs Applied</h1>
                </Col>
                
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Name', 'Email Address', 'Message', 
                        'Created At', 'Updated At']} sortable={
                        ['Name', 'Email Address', 'Message', 'Created At', 'Updated At']} data={applieds.map(applied => {
                            return {
                                'Name': applied.name,
                                'Email Address': applied.email,
                                'Message': applied.message,
                                'Resume':<a href={resumeUrl(applied.uploads.at(0))} 
                                 target= "_blank">
                                        <iframe height="120px" width="150px" src={resumeUrl(applied.uploads.at(0))}  
                                        className="resume-small" id="applied-list" />
                                    </a>,
                                'Created At': dtFormat(applied.createdAt),
                                'Updated At': dtFormat(applied.updatedAt),
                                'Actions': <>
                                    
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(applied._id)}>
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
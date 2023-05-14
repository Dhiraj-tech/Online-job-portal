import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/contacts')
        .then(({data}) => setContacts(data))
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
                        http.delete(`cms/contacts/${id}`)
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
                    <h1>Contact Us</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Name', 'Email',
                        'Subject', 'Message', 'Created At', 'Updated At']} sortable={
                        ['Name', 'Email', 'Subject', 'Message', 'Created At', 'Updated At']} data={contacts.map(contact => {
                            return {
                                'Name': contact.name,
                                'Email': contact.email,
                                'Subject': contact.subject,
                                'Message': contact.message,
                                'Created At': dtFormat(contact.createdAt),
                                'Updated At': dtFormat(contact.updatedAt),
                                'Actions': <>
                                    
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(contact._id)}>
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
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { DataTable, Loading } from "../components"
import http from "../http"
import { dtFormat } from "../lib"

export const JobsApplied = () => {

    const [applieds, setApplieds] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('applieds')
        .then(({data}) => setApplieds(data))
        .catch(() => { })
        .finally(() => setLoading(false))


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
                        <Loading/>: <DataTable searchable={['Job Title','Name', 'Email Address', 'Message', 
                        'Created At', 'Updated At']} sortable={
                        ['Job Title','Name', 'Email Address', 'Message', 'Created At', 'Updated At']} data={applieds.map(applied => {
                            return {
                                // 'Job Title':applied.job[0].title,
                                'Name': applied.name,
                                'Email Address': applied.email,
                                'Message': applied.message,
                                'Resume':applied.uploads,
                                'Created At': dtFormat(applied.createdAt),
                                'Updated At': dtFormat(applied.updatedAt),
                                
                            }
                        })} /> }
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}
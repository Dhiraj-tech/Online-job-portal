import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat, imgUrl } from "../../lib"

export const List = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/blogs')
        .then(({data}) => setBlogs(data))
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
                        http.delete(`cms/blogs/${id}`)
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
                    <h1>Blogs</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/blogs/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Blog
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Blog title', 'Description', 
                        'Created At', 'Updated At']} sortable={
                        ['Blog title', 'Description', 'Created At', 'Updated At']} data={blogs.map(blog => {
                            return {
                                'Blog title': blog.title,
                                'Description': blog.description,
                                'Image':<a href={imgUrl(blog.images.at(0))} 
                                 target= "_blank">
                                        <img src={imgUrl(blog.images.at(0))}  
                                        className="img-small" id="blog-list" />
                                    </a>,
                                'Created At': dtFormat(blog.createdAt),
                                'Updated At': dtFormat(blog.updatedAt),
                                'Actions': <>
                                    <Link to={`/blogs/${blog._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(blog._id)}>
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
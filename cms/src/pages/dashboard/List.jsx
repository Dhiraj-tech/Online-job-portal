import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import http from '../../http';
import { useSelector } from 'react-redux';

export const List = () => {

  const user = useSelector(st => st.user.value || '')

  const [customers, setCustomers] = useState(0);
  useEffect(() => {
    http.get('cms/customers').then((response) => {
      setCustomers(response.data);
    });
  }, []);
  const countcustomer = customers.length;


  const [categories, setCategories] = useState(0);
  useEffect(() => {
    http.get('cms/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);
  const countcategory = categories.length;


  const [companies, setCompanies] = useState(0);
  useEffect(() => {
    http.get('cms/companies').then((response) => {
      setCompanies(response.data);
    });
  }, []);
  const countcompany = companies.length;


  const [jobs, setJobs] = useState(0);
  useEffect(() => {
    http.get('cms/jobs').then((response) => {
      setJobs(response.data);
    });
  }, []);
  const countjob = jobs.length;


  const [contacts, setContacts] = useState(0);
  useEffect(() => {
    http.get('cms/contacts').then((response) => {
      setContacts(response.data);
    });
  }, []);
  const countcontact = contacts.length;

  const [blogs, setBlogs] = useState(0);
  useEffect(() => {
    http.get('cms/blogs').then((response) => {
      setBlogs(response.data);
    });
  }, []);
  const countblog = blogs.length;

  const [applieds, setApplieds] = useState(0);
  useEffect(() => {
    http.get('cms/applieds').then((response) => {
      setApplieds(response.data);
    });
  }, []);
  const countapplied = applieds.length;

  return (
    <Container>
      <Row>
      <Col xs="12">
             <Row>
                <Col>
                    <h1 className='text-center mt-2'><u>Dashboard</u></h1>
               </Col>
           </Row>
       </Col>
       
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total Customers<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countcustomer}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total Categories<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countcategory}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total Companies<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countcompany}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total JobLists<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countjob}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total Contacts<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countcontact}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total blogs<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countblog}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="3" className="mt-3">
          <Card>
            <Card.Header>Total AppliedJobs<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countapplied}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
      
      </Row>
    </Container>
  );
};



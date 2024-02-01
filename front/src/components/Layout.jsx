import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Layout.css"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage, isEmpty } from "../lib"
import http from "../http"
import { clearUser, setUser } from "../store"
import { SearchBox } from "./SearchBox"

export const Layout = () => {

    const [categories, setCategories] = useState([])
    const user = useSelector(st => st.user.value)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isEmpty(user)){
            const token = fromStorage('user_token')

            if(!isEmpty(token)) {
                http.get('https://online-job-portal-0ksn.onrender.com/profile/details')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        clearStorage('user_token')
                    })
            }
        }
    }, [user])

    const handleLogout = (ev) => {
        ev.preventDefault()
                
        dispatch(clearUser())
        clearStorage('user_token')
        window.location.replace("/");
    }

    useEffect(() => {
        http.get('https://online-job-portal-0ksn.onrender.com/category')
            .then(({data}) => setCategories(data))
            .catch((err) => {console.error(err)})
    

    }, [])

    return <> 
    <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
        <Link to="/" className="navbar-brand">NepalJobHub</Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mx-auto">
                <Nav.Item>
                    <NavLink className="nav-link" to="/">
                        <i className="fa-solid fa-house me-2"></i>Home
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className="nav-link" to="/about">
                        <i className="fa-solid fa-address-card me-2"></i>About Us
                    </NavLink>
                </Nav.Item>

                <NavDropdown title={<><i className="fa-solid fa-tags me-2"></i>Category</>} align="end">
                    {categories.map(category => <Link key={category._id}
                    className="dropdown-item" to={`category/${category._id}`}>
                    {category.name}</Link>)}
                </NavDropdown>

                <Nav.Item>
                    <NavLink className="nav-link" to="/blogs">
                        <i className="fa-brands fa-blogger me-2"></i>Blog
                    </NavLink>
                    
                </Nav.Item> 
                <Nav.Item>
                    <NavLink className="nav-link" to="/contacts">
                        <i className="fa-solid fa-address-book me-2"></i>Contact Us
                    </NavLink>
                </Nav.Item>               
                </Nav>
                <Nav.Item>
                    < SearchBox />
                </Nav.Item>               
              
                   <Nav>
                    {isEmpty(user) ? 
                        <Nav.Item>
                            <NavLink className="nav-link" to="/register">
                                <i className="fas fa-sign-in-alt me-2"></i>Register/Login
                            </NavLink>
                        </Nav.Item>: 
                        <Nav>
                            <NavDropdown title={<><i className="fa-solid fa-user-circle 
                            me-2"></i>{user.name}</>} align="end">
                                <div className="dropdown-item text-end"></div>
                                <Link to="/edit-profile" className="dropdown-item">
                                    <i className="me-2"></i>My Profile
                                </Link>
                                <Link to="/jobsapplied" className="dropdown-item">
                                    <i className="me-2"></i>Jobs Applied
                                </Link>
                                <Link to="/change-password" className="dropdown-item">
                                    <i className="me-2"></i>Change Password
                                </Link>
                                <hr className="nav-dropdown-divider" />
                                <Button variant="link" className="dropdown-item rounded-0"
                                onClick={handleLogout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                                </Button>
                            </NavDropdown>
                        </Nav>
                        }
                        
                     </Nav>
            
           
        </Navbar.Collapse>
    </Container>
</Navbar>
    
<Outlet />

<footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About</h6>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat minus expedita dicta assumenda distinctio ipsa iure,
                  repellendus placeat blanditiis. Aliquam nisi dolorum
                  laudantium nostrum minus doloribus tempora adipisci quisquam
                  quaerat, reiciendis dignissimos ea excepturi quidem vel
                  repellendus aperiam odio reprehenderit. Vero, est ex? Ex vel
                  modi dicta ducimus placeat labore!
                </p>
              </div>

              <div className="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contacts">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blog</Link>
                  </li>
                  <li>
                    <Link to="termscon">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-sm-6 text-center text-sm-left">
                <div className="row">
                  <div className="col-12 text-uppercase">
                    <h6>Newsletter</h6>
                  </div>
                  <div className="col-12">
                    <form action="#">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email..."
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <button className="btn btn-outline-light text-uppercase">
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="text-center p-3" id="footer">
              © 2023 Copyright: Dhiraj Kumar Ray
            </div>
          </div>
        </footer>
    

</>
          
    
}
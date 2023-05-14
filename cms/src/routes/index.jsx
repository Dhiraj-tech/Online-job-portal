import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import { Auth, Companies, Categories, Customers, Dashboard, Jobs, Profile, Applieds, Blogs, Contacts } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRoute } from "./AdminRoute"

export const RouteList = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute element={<Dashboard.List />}/>} />

                <Route path="edit-profile" element={<PrivateRoute element={<Profile.Edit />}/>} />

                <Route path="change-password" element={<PrivateRoute element={<Profile.Password />}/>} />

                <Route path="customers" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Customers.List />} />
                    <Route path="create" element={<Customers.create />} />
                    <Route path=":id/edit" element={<Customers.Edit />} />
                </Route>

                <Route path="categories" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Categories.List />} />
                    <Route path="create" element={<Categories.create />} />
                    <Route path=":id/edit" element={<Categories.Edit />} />
                </Route>

                <Route path="companies" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Companies.List />} />
                    <Route path="create" element={<Companies.create />} />
                    <Route path=":id/edit" element={<Companies.Edit />} />
                </Route>

                <Route path="jobs" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Jobs.List />} />
                    <Route path="create" element={<Jobs.create />} />
                    <Route path=":id/edit" element={<Jobs.Edit />} />
                </Route>

                <Route path="blogs" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Blogs.List />} />
                    <Route path="create" element={<Blogs.create />} />
                    <Route path=":id/edit" element={<Blogs.Edit />} />
                </Route>

                <Route path="contacts" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Contacts.List />} />
                </Route>

                <Route path="applieds" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Applieds.List />} />
                    <Route path="create" element={<Applieds.create />} />
                </Route>

                <Route path="/login" element={<Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";
import * as Components from "../components"

export const RouteList = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<Pages.Home />} />

                <Route path="category/:id" element={<Pages.Category />}></Route>

                <Route path="job/:id" element={<Pages.Job />}></Route>

                <Route path="blogs" element={<Components.BlogList />}></Route>
                
                <Route path="search" element={<Pages.Search />}></Route>

                <Route path="register" element={<Pages.Register />} />

                <Route path="login" element={<Pages.Login />}></Route>
                
                <Route path="about" element={<Pages.About />} />

                <Route path="contacts" element={<Pages.Contact />} />

                <Route path="termscon" element={<Pages.TermsCondition />} />

                <Route path="edit-profile" element={<Pages.EditProfile />} />

                <Route path="change-password" element={<Pages.ChangePassword />} />

                <Route path="applieds" element={<Pages.Applieds />} />

                <Route path="jobsapplied" element={<Pages.JobsApplied />} />

                <Route path="*" element={<h1 className="text-center">404 Page Not Found</h1>} />
            </Route>
            
        </Routes>
    </BrowserRouter>
    
}
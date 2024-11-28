import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "../components/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";
import FilmInfo from "./Pages/FilmInfo/FilmInfo";

export default function Layout() {
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <MainPage/>
            },
            {
                path: 'films/:id',
                element: <FilmInfo/>
            }
        ]
    }
])

export function AppRouterProvider() {
    return <RouterProvider router={router}/>
}
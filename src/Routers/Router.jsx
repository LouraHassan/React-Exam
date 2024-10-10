import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import BooksPage from "../Pages/BooksPage";
import Favorites from "../Pages/Favorites";
import ReadBooks from "../Pages/ReadBooks";
import BookDetails from "../Pages/BookDetails";
const Router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/home',
        element: <Home></Home>
    },
    {
        path: '/bookList',
        element: <BooksPage></BooksPage>
    },
    {
        path: '/favorite/:id',
        element: <Favorites></Favorites>
    },
    {
        path: '/readBook/:id',
        element: <ReadBooks></ReadBooks>
    },
    {
        path: '/bookDetail/:bookId',
        element: <BookDetails></BookDetails>
    }

])

export default Router
import {useState, useEffect} from 'react'
import Nav from '../Components/Nav'
import BookCard from '../Components/bookCard'
import axios from 'axios'

const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`;
const booksAPI = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=UBDHOrOPPSCuAQf55uEMRxNbmUPIbSrk`
function BooksPage() {
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState([])
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')

    console.log(userId);
    
    
    useEffect(() => {
        getUser()
    },[])
    const getUser = () => {
        axios.get(usersAPI + `/` + userId).then(res => {
            setUser(res.data)
            console.log(res.data);
        })
    }
    useEffect(() => {
    getBooks()
},[])
    const getBooks = () => {
        axios.get(booksAPI).then(res => {
            console.log(res.data.results.books);
            setBooks(res.data.results.books)
        })
    }

    const searchAction = () => {
        if (search != '') {
            const searchList =[]
                books.map(book => {
                if (book.title.toLowerCase().includes(search.toLowerCase())) {
                    setBooks(searchList) 
                    console.log(books);
                    
                }
            })
        } else {
            getBooks()
        }
    }
  return (
    <div>
          <Nav></Nav>

          <div className='flex flex-col items-center'>
              
              <div className='flex flex-col w-[90vw]'>
              <p className='font-bold text-2xl'>Books List</p>
                  <div className='flex my-4'>
                      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='input input-bordered w-full' placeholder='Search books' />
                      <button onClick={searchAction} className='btn mx-2 btn-accent'>Search</button>
                  </div>
              </div>
          <div className='grid grid-cols-2 gap-2 p-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-5'>
              {books.map(book => {
                  return (<BookCard userId={userId} id={book.rank} image={book.book_image} title={book.title} author={book.author}></BookCard>)
                })}
          </div>
                </div>
    </div>
  )
}

export default BooksPage

import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../Components/Nav'
const booksAPI = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=UBDHOrOPPSCuAQf55uEMRxNbmUPIbSrk`

function BookDetails() {
    const {bookId} = useParams()
    const [books, setBooks] = useState([])
    const [currentBook, setCurrentBook] = useState([])

    
    useEffect(() => {
        getBooks()
    }, [])

    // useEffect(() => {
    //     setCurrentBook(books[bookId])

    // },[])
    // console.log(books[bookId]);
 
    const getBooks = () => {
        axios.get(booksAPI).then(res => {
            console.log(res.data.results.books);
            setBooks(res.data.results.books)   
            setCurrentBook(res.data.results.books[bookId])
        })
    }
    
  
  return (
    <div>
          <Nav></Nav>
          <div className='flex flex-col items-center '>
              <div className='flex flex-col items-center justify-around lg:flex-row my-10  md:flex-row w-full border-black'>
                  
                  <div className='flex flex-col items-center md:items-start'>
                      
          <p className='text-xl font-semibold'>{currentBook.title}</p>
              <p className='text-lg'>Author: {currentBook.author}</p>
              <p className='text-lg'>Purchase from here : <a href={currentBook.amazon_product_url} target='_blank' className='text-accent'>Amazon</a></p>
                  </div>
                  <img src={currentBook.book_image} alt="" className='w-[45vw] rounded-md my-4 md:w-[20vw] lg:w-[20vw]' />
              </div>
              <Link to='/bookList' className='btn btn-secondary'>Go back </Link>
          </div>

    </div>
  )
}

export default BookDetails

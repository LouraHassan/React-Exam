import {useState, useEffect} from 'react'
import Nav from '../Components/Nav'
import axios from 'axios'
import BookCard from '../Components/bookCard'
const readAPI = `https://67077eaca0e04071d22a9158.mockapi.io/read`
const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`;

function ReadBooks() {
    const userId = localStorage.getItem('userId')
    const [books, setBooks] = useState([])
    const [user, setUser] = useState([])
    console.log(userId);
    
    
    useEffect(() => {
        getBooks()
    },[])
    const getBooks = () => {
        axios.get(readAPI).then(res => {
             setBooks(res.data)
         })
    }
    
    useEffect(() => {
        getUser()
    },[])
    const getUser = () => {
        axios.get(usersAPI + `/` + userId).then(res => {
            setUser(res.data)
            console.log(res.data);
        })
    }
    return (
      
    <div>
            <Nav></Nav>
            <div className='flex flex-col items-center'>

          <p className='font-bold text-2xl'>Read Books</p>

          <div className='grid grid-cols-2 gap-2 p-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-5'>
                    {books.map(book => {
                        if (book.userId == userId) {
                            return (<BookCard userId={userId} id={book.id} image={book.image} title={book.title} author={book.author}></BookCard>)     
                        }
                    })} 
                    
              </div>
                    </div>
    </div>
  )
}

export default ReadBooks

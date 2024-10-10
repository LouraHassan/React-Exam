import {useState, useEffect} from 'react'
import Nav from '../Components/Nav'
import axios from 'axios'
import BookCard from '../Components/bookCard'


const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`;
const favoriteAPI = `https://67077eaca0e04071d22a9158.mockapi.io/favorite`
function Favorites() {
    const userId = localStorage.getItem('userId')
    const [books, setBooks] = useState([])
    const [user, setUser] = useState([])

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
        axios.get(favoriteAPI).then(res => {
             setBooks(res.data)
         })
     }
  return (
    <div>
          <Nav></Nav>
          <div className='flex flex-col items-center'>
              <p className='font-bold text-2xl'>Favorite List</p>
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

export default Favorites

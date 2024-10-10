import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Components/Nav'
import axios from 'axios';

const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`;
function Home() {
    const userId = localStorage.getItem('userId')
    console.log(userId);
    
    const [user, setUser] = useState([])
    
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
          <div>
              {user ? <p className='text-3xl font-bold m-4'> welcome {user.name}</p> : <></>}
              <div className='w-[40vw] my-10'>
                  
              <p className='text-4xl m-4 font-semibold'>Here You can browse a number of books that you may like!</p>
              <Link to='/bookList' className='btn btn-primary m-4'>Browse now</Link>
              </div>
          </div>
    </div>
  )
}

export default Home

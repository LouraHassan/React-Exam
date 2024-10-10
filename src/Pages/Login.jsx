import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/book-logo.png'

import axios from 'axios'

const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`
function Login() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningText, setWarningText] = useState('');
    
    useEffect(() => {
        getUsers();
        
      }, []);
      const getUsers = () => {
        axios.get(usersAPI).then((res) => {
          setUsers(res.data);
        });
    };
    
    const checkUser = (email) => {
        let userExist = users.some(user => user.email == email)
        return userExist
    };
     
    const loginAction = () => {
        if (email == '' || password == '') {
            setWarningText('You have to fill all the fields first')
        } else if (!checkUser(email)) {
            setWarningText("You don't have an account")
        } else {
            const user = users.find(el => el.email == email)
            if (password != user.password) {
                setWarningText('Incorrect password')
            } else {
                setWarningText('')
                console.log(user);
                const userId = localStorage.setItem('userId', user.id)
                console.log("Logged in");
                navigate(`/home`)
            }
        }
    }
  return (
      <div className='flex flex-col items-center h-screen justify-center p-4 lg:flex-row-reverse'>
               <div className="flex items-center justify-start w-[80vw] md:w-[50vw] lg:w-[30vw] lg:flex-col-reverse lg:justify-center">
              <p className='text-2xl font-bold'>Books Library</p>
              <img src={logo} alt="" className="w-[10vw]"/>
                  </div>
          <div className='flex flex-col w-[80vw] md:w-[50vw] lg:w-[30vw]'>
          <p className='font-semibold text-4xl my-4'>Welcome Back!</p>
          
              <div className='flex flex-col bg-white p-10 shadow-lg rounded-lg'>
                  <p className='font-bold text-2xl'>LogIn</p>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='input input-bordered my-2 bg-orange-50' placeholder='Enter your email' /> 
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='input input-bordered my-2 bg-orange-50' placeholder='Password' />
                  <p className='text-error text-sm'>{warningText}</p>
                  <button className='btn btn-primary font-bold my-4' onClick={loginAction}>LogIn</button>
                  <p className='my-2'>Don't have an account? <Link to='/signup' className='text-accent'>SignUp</Link></p>       
          </div>
          </div>
    </div>
  )
}

export default Login

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '/book-logo.png'
import axios from "axios";

const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`;
function Signup() {
    const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
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

    const checkPassword = (password) => {
        return password > 8
    }
    const signUpAction = () => {
        if (name == '' || email == '' || password == '' || confirmPass == '') {
            setWarningText('You have to fill all the fields')
        } else if (checkUser(email)) {
            setWarningText('You already have an account')
        } else if (!checkPassword) {
            setWarningText('Password must be more than 8 digits')
        } else if (confirmPass != password) {
            setWarningText("Password doesn't match")
        } else {
            setWarningText('')
            axios.post(usersAPI, {
                name: name,
                email: email,
                password: password
            }).then(res => {
                console.log(res);
                setCurrentUser(res.data.id)
                console.log(currentUser);
                console.log('account created');
                const userId = localStorage.setItem('userId', res.data.id)
                navigate(`/home`)
            })
        }
    }
  return (
      <div className="flex flex-col items-center h-screen justify-center p-4 lg:flex-row-reverse">
             <div className="flex items-center justify-start w-[80vw] md:w-[50vw] lg:w-[30vw] lg:flex-col-reverse lg:justify-center">
              <p className='text-2xl font-bold'>Books Library</p>
              <img src={logo} alt="" className="w-[10vw]"/>
                  </div>
      <div className="flex flex-col w-[80vw] md:w-[50vw] lg:w-[30vw]">
        <p className="font-semibold text-4xl my-4">Create Account</p>

        <div className="flex flex-col bg-white p-10 shadow-lg rounded-lg">
          <p className="font-bold text-2xl">SignUp</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input input-bordered my-2 bg-orange-50"
            placeholder="Enter your Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="input input-bordered my-2 bg-orange-50"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input input-bordered my-2 bg-orange-50"
            placeholder="Password"
          />
          <input
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            className="input input-bordered my-2 bg-orange-50"
            placeholder="Password retype"
          />
                  <p className='text-error text-xs'>{warningText}</p>
          <button className="btn btn-primary font-bold my-4" onClick={signUpAction}>SignUp</button>
          <p className="my-2">
            Already have an account?
            <Link to="/" className="text-accent">
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

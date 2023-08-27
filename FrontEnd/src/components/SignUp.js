import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  const [credentials, setCredentials] = useState({sname : "" ,semail : "", spassword :"", cpassword : ""});
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const navigate = useNavigate();
    const handleSubmit =async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name : credentials.sname,
              email : credentials.semail,
              password : credentials.spassword
            }),
        });
        const json = await response.json();
        if(json.success===true){
            localStorage.setItem('token',json.authToken);
            // redirect
            navigate('/')
            props.showAlert("User signUp Successfully !",'success')
        }
        else{
          props.showAlert("User signUp Failed!",'danger')
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="sname">Name</label>
          <input type="text" name='sname' className="form-control" required minLength={3} id="sname" value={credentials.s} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Name" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="semail">Email address</label>
          <input type="email" name='semail' className="form-control"  value={credentials.semail} onChange={onChange} id="semail" required aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="spassword">Password</label>
          <input type="password" className="form-control" onChange={onChange} required minLength={5} value={credentials.spassword}  id="spassword" name='spassword' placeholder="Password" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} required minLength={5} value={credentials.cpassword} id="cpassword" name='cpassword' placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

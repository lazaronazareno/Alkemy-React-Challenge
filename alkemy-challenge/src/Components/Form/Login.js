import React, { useEffect, useState } from "react";
import loginApi from '../../loginApi';
import './formStyles.scss';


function Login (props) {
    const [form, setValues] = useState({
        email: '',
        password: '',
        loading:false,
        error:null,
        token: '',
      });
    
      const handleInput = event => {
        setValues({
          ...form,
          [event.target.name]: event.target.value
        });
      };

      const handleSubmit = async event => {
        event.preventDefault();
        setValues ({loading: true, error:null})
        const data = await loginApi.login.accept(form);
        console.log(data)
        setValues({
          loading: false,
          token: data.token,
          error: data.error
        });
        if (data.token){
          props.history.push('/search',data.token);
        }else {
          document.getElementById("form").reset(); 
          setValues({
            ...form,
            loading: false,
            error: data.error,
          });
        };
      };

    useEffect(() => {
      return () => {
        setValues({loading:false})
      }
    }, [])


  return (
    <div className="container-fluid bg-danger bg-gradient loginGeneralDiv">
        <section className="card mb-3 text-dark bg-warning p-4">
          <h1 className="card-title p-3 border border-3 border-dark">SuperHeroes Page Login</h1>
          <form className="d-flex flex-column" id="form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input
                  name="email"
                  id="floatingInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  onChange={handleInput}
                />
                <label for="floatingInput">Email : </label>
            </div>
            <div className="form-floating mb-3">
                <input
                  name="password"
                  id="floatingPassword"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
                <label for="floatingPassword">Password : </label>
            </div>
            <button className="btn btn-primary btn-lg" type="submit" token={form.token} >
                  Login
            </button>
          </form>
        {form.loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
          )}
          {form.error && (
            <h1>{form.error}</h1>
          )}
        </section>
      </div>
  );
}

export default Login;
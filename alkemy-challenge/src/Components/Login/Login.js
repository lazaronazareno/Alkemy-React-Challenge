import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import loginApi from '../../loginApi';
import './formStyles.scss';


function Login ({ setToken }) {
    const [form, setValues] = useState({
        email: '',
        password: '',
        loading:false,
        error:null,
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
        const token = await loginApi.login.accept(form);
        setToken(token);
        setValues({
          loading: false,
          error: token.error
        });
        if (token.error){
          document.getElementById("form").reset(); 
          setValues({
            ...form,
            loading: false,
            error: token.error,
          });
        }
      };

    useEffect(() => {
      if(form.error) {
        return;
      }
      return () => {
        setValues({...form,loading:false})
      }
    }, [])


  return (
    <div className="container-fluid d-flex justify-content-center">
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
                <label htmlFor="floatingInput">Email : </label>
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
                <label htmlFor="floatingPassword">Password : </label>
            </div>
            <button className="btn btn-primary btn-lg" type="submit">
                  Login
            </button>
          </form>
        {form.loading && (
           <div className="d-flex justify-content-center m-3">
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;
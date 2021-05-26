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
    <div className="loginGeneralDiv">
        <section className="loginDiv">
          <h1 className="loginTittle">SuperHeroes Page Login</h1>
          <form className="loginForm" id="form" onSubmit={handleSubmit}>
            <input
              name="email"
              className="inputLogin"
              type="text"
              placeholder="Email"
              onChange={handleInput}
            />
            <input
              name="password"
              className="inputLogin"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <button className="loginButton" type="submit" token={form.token} >
                  Login
            </button>
          </form>
        {form.loading && (
            <h1 className="loginText">Cargando</h1>
          )}
          {form.error && (
            <h1 className="loginText">{form.error}</h1>
          )}
        </section>
      </div>
  );
}

export default Login;
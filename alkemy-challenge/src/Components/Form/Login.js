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
        <section className="form">
          <h2>Login</h2>
          <form className="form" id="form" onSubmit={handleSubmit}>
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Email"
              onChange={handleInput}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <button type="submit" token={form.token} >
                  Login
            </button>
          </form>
        {form.loading && (
            <h1>Cargando</h1>
          )}
          {form.error && (
            <h1>{form.error}</h1>
          )}
        </section>
  );
}

export default Login;
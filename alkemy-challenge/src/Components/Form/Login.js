import React, { useState } from "react";
import loginApi from '../../loginApi';
import './formStyles.scss';


function Login (props) {
    const [form, setValues] = useState({
        email: '',
        password: '',
        pass: false,
        loading:false,
        error:null,
        token: '',
      });

    const validate = {
        email: 'challenge@alkemy.org',
        password: 'react',
    }

    const compare = () => {
        if (form){
            if(form.email === validate.email && form.password === validate.password){
                setValues({
                  ...form,
                    pass: true})
            }
        }
    }
    
      const handleInput = event => {
        setValues({
          ...form,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSubmit = async event => {
        event.preventDefault();
        setValues ({loading: true, error:null})
        if(form.pass === true) {
            try{
              const data = await loginApi.login.accept(form);
              props.history.push('/search');
              console.log(data.token)
              setValues({
                ...form,
                loading: false,
                data: data,
                token: data.token
              });
            } catch (error){
              setValues({
                ...form,
                loading: false,
                error: error,
              });
            };
        } else {
            alert('Usuario y/o Contraseña Incorrecta')
        }
    };
  return (
    <>
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleInput}
              onKeyUp={compare}
              onBlur={compare}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleInput}
              onKeyUp={compare}
              onBlur={compare}
            />
            <button type="submit" >
                  Iniciar sesión
            </button>
          </form>
        </section>
    </>
  );
}

export default Login;
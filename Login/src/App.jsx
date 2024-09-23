import { useCallback, useRef, useState } from 'react';
import './App.css'
import axios, { AxiosError } from 'axios';
function App() {

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSucesso, setFormSucesso] = useState(false);
 
  const handRegisterClick = useCallback( async (event) => {
    event.preventDefault();
    setFormError();
    setFormSucesso(false);




  const emailReg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );
  if(emailInputRef.current && passwordInputRef.current){

    const email = emailInputRef.current.value;
    const pass1  = passwordInputRef.current.value;

   let shouldReturnError = false;

  if(!emailReg.test(email)){
    setFormError("Digite um e-mail válido")
    shouldReturnError = true;
    setFormLoading(false);
    setFormSucesso(false);
  }
  if(pass1.length < 8 ){
    setFormError("A senha precisa ter pelo menos 8 caracteres")
    shouldReturnError = true;
    setFormLoading(false);
    setFormSucesso(false);

  }
  if(
    shouldReturnError 
  ){
    setFormError();
    setFormLoading(false);
    setFormSucesso(false);
    return;

  }
  try{
  const response = await axios.post("",{
    email,
    password: pass1,
  });
  setFormLoading(false);
  setFormSucesso(true);


} catch (error) {
  if (error instanceof AxiosError){
    setFormError(error.message)
  }
  setFormLoading(false);
  setFormSucesso(false);


}

  }

  
},   [])

  return (
    <div>
      <h1>Login/Cadastro</h1>
      <form onSubmit={(event) => handRegisterClick(event)}>
        <label htmlFor='email'>Email</label>
        <input type="text"
        ref={emailInputRef}
        placeholder='Digite Login'
        id='email'
        required        
        
        />
                <label htmlFor='password'>Senha</label>

           <input type="password"
           ref={passwordInputRef}
        placeholder='Digite senha'
        id='password'
        required        
        
        />
        <div>

          {formError && (<div>
            <p>Erro no Formulario</p>
            <p>{formError}</p>
          </div>
          )}
        <button disable={formLoading}>Aperta aqui</button>
        
        </div>
      </form>
        
    </div>
  )
}

export default App

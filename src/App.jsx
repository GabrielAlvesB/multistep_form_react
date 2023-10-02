import { useState } from 'react'

import './App.css'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {FiSend} from 'react-icons/fi'
import UserForm from './components/userForm/UserForm';
import ReviewForm from './components/reviewForm/ReviewForm';
import Thanks from './components/thanks/Thanks';
import Steps from './components/steps/Steps';

//hooks

import { useForm } from './hooks/useForm';

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
};



function App() {

  const [data, setData] = useState(formTemplate)

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  const fromComponents = [<UserForm data={data} updateFieldHandler={updateFieldHandler}/>, <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>, <Thanks data={data}/>]

  const {currentStep, currentComponent, changeStep, isLastStep, isFirstStep}= useForm(fromComponents)

  return (
    <div className='app'>
      <div className='header'>
        <h2>Deixe sua Avaliação</h2>
        <p>Ficamos felizes com sua compra, utilzie o formulário abaixo para avaliar o produto</p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep}/>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type='button' onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious/>
              <span>voltar</span>
            </button>
            )}
            
            {!isLastStep ? (
              <button type='submit'>
                <span>Avançar</span>
                <GrFormNext/>
              </button>
            ) : (
              <button type='button'>
                <span>Enviar</span>
                <FiSend/>
              </button>
            )}
          
          </div>
        </form>
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { Formstate } from '../utils/Constant'
import { LoginPage } from '../component/LoginPage';
import { RegisterPage } from '../component/RegisterPage';
import { useSelector } from 'react-redux';

export const Login = () => {
  const formState =  useSelector( state => state.formstateReducer)
  return (
    <>
      {formState === Formstate.Login && <LoginPage />}
      {formState === Formstate.Register && <RegisterPage />}
    </>
  )
}

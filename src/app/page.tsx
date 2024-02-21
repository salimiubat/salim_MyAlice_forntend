'use client'
import React from 'react'
import LoginForm from './login/page'
import { Provider } from 'react-redux'
import store from './store/store'

import axiosInstance from './components/Config'


export default function page() {
  return (
    // <Provider store={store}>
    <div><LoginForm/></div>
    // </Provider>
  )
}
// window.axios = axiosInstance;


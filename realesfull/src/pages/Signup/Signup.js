

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Contex";
import { createUser } from "../../utils/api";
import InputControl from "../InputControl/InputControl";
import styles from "./Signup.module.css";
import { useUserDetailContext } from "../../Context/userDetailContext";
import GoogleAuth from "../googleAuth/GoogleAuth";
import * as Yup from 'yup';
import { useMutation } from "react-query";
import { toast } from "react-toastify";



const Signup = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();



  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const {mutate} = useMutation({
    mutationKey: ['create User'],
    mutationFn: (userData)=> createUser( userData.name , userData.email , userData.pass)
  })


  const validationSchema = useFormik({
    initialValues: {
      name: "",
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      pass: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
          'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character'
        )
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      dispatch({ type: 'LOGIN_START' });

      setSubmitButtonDisabled(true);
          console.log(values, "name email , pass")
          // const response = createUser(values.email, token);
          mutate(values, {
            onSuccess: (data) =>{
              console.log(data , "Data from the user")
              dispatch({type: "LOGIN_SUCCESS" , payload:data})
              toast.success('user has been created !')
              data && navigate('/')
            },
            onError:(error)=>{
              console.log(error , "error create user")
              toast.error('Error creating user')
            }
          })

        
       

    },
  });

  return (
    <>
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          name="name"
          onChange={validationSchema.handleChange}
          onBlur={validationSchema.handleBlur}
          value={validationSchema.values.name}
        />
        {validationSchema.touched.name && validationSchema.errors.name && (
          <span className={styles.error} style={{color:'red'}} >{validationSchema.errors.name}</span>
        )}

        <InputControl
          label="Email"
          placeholder="Enter email address"
          name="email"
          onChange={validationSchema.handleChange}
          onBlur={validationSchema.handleBlur}
          value={validationSchema.values.email}
        />
        {validationSchema.touched.email && validationSchema.errors.email && (
          <span className={styles.error} style={{color:'red'}}>{validationSchema.errors.email}</span>
        )}

        <InputControl
          label="Password"
          placeholder="Enter password"
          type="password"
          name="pass"
          onChange={validationSchema.handleChange}
          onBlur={validationSchema.handleBlur}
          value={validationSchema.values.pass}
        />
        {validationSchema.touched.pass && validationSchema.errors.pass && (
          <span className={styles.error} style={{color:'red'}} >{validationSchema.errors.pass}</span>
        )}

        <div className={styles.footer}>
          <b className={styles.error}>{validationSchema.errors.form}</b>
          <button type="submit"  onClick={validationSchema.handleSubmit} disabled={submitButtonDisabled}>
            Signup
          </button>
        </div>
        <GoogleAuth type={'Signup'} />

      </div>
    </div>
</>
  );
};

export default Signup;

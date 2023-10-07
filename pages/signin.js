/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styles from "../styles/signin.module.scss";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInput";
import { EyeClose, Eye } from "@styled-icons/remix-line";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { getProviders, signIn } from "next-auth/react";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_pass: "",
};

export default function signin({ country, providers }) {
  console.log(providers);
  const [user, setUser] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const { login_email, login_password, name, email, password, conf_password } =
    user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password."),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 character.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <>
        <Header country={country} />
        <div className={styles.login}>
          <div className={styles.login__container}>
            <div className={styles.login__header}>
              <span>
                We'd be happy to join us! <Link href="/">Go Store</Link>
              </span>
            </div>
            <div className={styles.login__form}>
              <h1>Sign In</h1>
              <p>
                Get access to one of the best Eshopping services in the world.
              </p>
              <Formik
                enableReinitialize
                initialValues={{ login_email, login_password }}
                validationSchema={loginValidation}
              >
                {(form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="login_email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <div className={`${styles.input} ${styles.password}`}>
                      <LoginInput
                        type={showPassword ? "text" : "password"}
                        name="login_password"
                        icon="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className={`password-toggle ${styles.Eye} ${
                          showPassword ? "show" : "hide"
                        }`}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye size="24" />
                        ) : (
                          <EyeClose size="24" />
                        )}
                      </button>
                    </div>
                    <CircledIconBtn type="submit" text="Sign in" />
                    <div className={styles.forgot}>
                      <Link href="/forget">Forgot password ?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className={styles.login__socials}>
                <span className={styles.or}>Or continue with</span>
                <div className={styles.login__socials_wrap}>
                  {providers.map((provider) => (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with
                        {provider.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login__container}>
            <div className={styles.login__form}>
              <h1>Sign up</h1>
              <p>
                Get access to one of the best Eshopping services in the world.
              </p>
              <Formik
                enableReinitialize
                initialValues={{ name, email, password, conf_password }}
                validationSchema={registerValidation}
              >
                {(form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="name"
                      icon="user"
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="text"
                      name="email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <div className={`${styles.input} ${styles.password}`}>
                      <LoginInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        icon="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className={`password-toggle ${styles.Eye} ${
                          showPassword ? "show" : "hide"
                        }`}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye size="24" />
                        ) : (
                          <EyeClose size="24" />
                        )}
                      </button>
                    </div>
                    <div className={`${styles.input} ${styles.password}`}>
                      <LoginInput
                        type={showPassword ? "text" : "password"}
                        name="conf_password"
                        icon="password"
                        placeholder="Re-Type Password"
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className={`password-toggle ${styles.Eye} ${
                          showPassword ? "show" : "hide"
                        }`}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye size="24" />
                        ) : (
                          <EyeClose size="24" />
                        )}
                      </button>
                    </div>
                    <CircledIconBtn type="submit" text="Sign up" />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <Footer country={country} />
      </>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}

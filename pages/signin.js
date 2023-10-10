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
import {
  getCsrfToken,
  getSession,
  getProviders,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import Router from "next/router";
const initialValues = {
  login_email: "",
  login_password: "",
  login_error: "",
  name: "",
  email: "",
  password: "",
  conf_pass: "",
  success: "",
  error: "",
};

export default function signin({ country, providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const {
    login_email,
    login_password,
    login_error,
    name,
    email,
    password,
    conf_password,
    success,
    error,
  } = user;
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
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setUser({ ...user, success: "", error: errorMessage });
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };
  return (
    <div>
      <>
        {loading && <DotLoaderSpinner Loading={loading} />}
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
                onSubmit={() => {
                  signInHandler();
                }}
              >
                {(form) => (
                  <Form method="post" action="/api/auth/signin/email">
                    <input
                      type="hidden"
                      name="csrfToken"
                      defaultValue={csrfToken}
                    />
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
                    <CircledIconBtn type="submit" text="Slide to Sign in" />
                    {login_error && (
                      <span className={styles.error}>{login_error}</span>
                    )}
                    <div className={styles.forgot}>
                      <Link href="/forget">Forgot password ?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className={styles.login__socials}>
                <span className={styles.or}>Or continue with</span>
                <div className={styles.login__socials_wrap}>
                  {providers.map((provider) => {
                    if (provider.name == "Credentials") {
                      return;
                    }
                    return (
                      <div key={provider.name}>
                        <button
                          className={styles.social__btn}
                          onClick={() => signIn(provider.id)}
                        >
                          <img
                            src={`../../icons/${provider.name}.png`}
                            alt=""
                          />
                          Sign in with
                          {provider.name}
                        </button>
                      </div>
                    );
                  })}
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
                onSubmit={() => {
                  signUpHandler();
                }}
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
                    <CircledIconBtn type="submit" text="Slide to Sign up" />
                  </Form>
                )}
              </Formik>
              <div>
                {success && <span className={styles.success}>{success}</span>}
              </div>
              <div>
                {error && <span className={styles.error}>{error}</span>}
              </div>
            </div>
          </div>
        </div>
        <Footer country={country} />
      </>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });

  const { callbackUrl } = query;
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
}

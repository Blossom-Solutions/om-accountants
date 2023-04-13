import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import withApollo from "../lib/withApollo";
import styles from "../styles/login.module.css";
import {getJwtPayload} from "../lib/jwt";

const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skipQuery, setSkipQuery] = useState(true);
    const router = useRouter();
  
    const { error, data } = useQuery(LOGIN_QUERY, {
      variables: { email, password },
      skip: skipQuery,
      fetchPolicy: 'network-only',
      onError: (error) => {
        console.error('Error during login:', error);
      },
      onCompleted: (data) => {
        localStorage.setItem('jwtToken', data.login);
        const payload = getJwtPayload();
        console.log(getJwtPayload())
        if(payload != null && payload.role === 'ACCOUNTANT'){
            router.push('/reports')
        }else{
            router.push('/company')
        }
      },
    });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSkipQuery(false);
    };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className={styles.button} type="submit">Login</button>
          <p className={styles.button} onClick={()=>router.push('/register')}>Register</p>
        </form>
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default withApollo(LoginPage);

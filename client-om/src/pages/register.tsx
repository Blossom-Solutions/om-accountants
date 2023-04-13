import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import withApollo from '../lib/withApollo';
import styles from '../styles/register.module.css';
import {getJwtPayload} from "../lib/jwt";

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $role: String!) {
    register(email: $email, password: $password, role: $role)
  }
`;

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [register, { error, data }] = useMutation(REGISTER_MUTATION);
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { data } = await register({
          variables: {
            email,
            password,
            role,
          },
        });
        localStorage.setItem('jwtToken', data.register);
        const payload = getJwtPayload();
        if(payload != null && payload.role === 'ACCOUNTANT'){
          router.push('/reports')
        }else{
          router.push('/company')
        }
        router.push('/');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    };
  
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Register</h1>
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
              <select
                className={styles.select}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="ACCOUNTANT">Accountant</option>
              </select>
              <br />
              <button className={styles.button} type="submit">
                Register
              </button>
            </form>
            {error && <p>Error: {error.message}</p>}
          </div>
        </div>
      );
  };

  export default withApollo(RegisterPage);
  


import { useAuth } from "context/auth-context";
import React from "react";

const apiURL = process.env.REACT_APP_API_URL;

const Login = () => {
  const { login, user } = useAuth();
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          登陆成功, 用户名: {user?.name} token: {user.token}
        </div>
      ) : null}

      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

export default Login;

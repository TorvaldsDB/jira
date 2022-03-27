import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";

const Login = () => {
  const { login } = useAuth();
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };

  // const handleSubmit = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   const target = event.target as typeof event.target & {
  //     username: { value: string };
  //     password: { value: string };
  //   };

  //   const username = target.username.value;
  //   const password = target.password.value;
  //   login({ username, password });
  // };

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="text" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default Login;

import React from "react";
import "./SignIn.css";
import InputForm from "../../components/InputForm/InputForm";
// import { Form } from 'react-router-dom';
import { Button, Input, Form, message } from "antd";
import { login } from "../../Firebase/Firebase";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    try {
      const user = await login(values.email, values.password);
      setUser(user);
      navigate(`/`);
      localStorage.setItem("userData", JSON.stringify(user));
    } catch (error: any) {
      message.error("şifreniz ya da e-postanız hatalı")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div className="sign-in">
      <div className="sign-in-form">
        <Form
          className="sign-in-form-content"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="sign-in-input"
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="sign-in-input"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
            
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;

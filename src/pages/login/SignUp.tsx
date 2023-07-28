import React from "react";
import "./SignUp.css";
import { Button, Input, Form } from "antd";
import { register } from "../../Firebase/Firebase";

const SignUp = () => {
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    try {
      const user = await register(values.email, values.password);
      console.log(user);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div className="sign-up">
      {/* <InputForm/> */}
      <div className="sign-up-form">
      <Form
        className="sign-up-form-content"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item className="sign-up-input"
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="sign-up-input"
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

export default SignUp;

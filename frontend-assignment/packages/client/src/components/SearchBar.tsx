import React, { FC, useState } from "react";
import { Button, Form, Input, Radio, RadioChangeEvent, Row } from "antd";
import "./SearchBar.css";

interface SearchBarProps {
  callbackSetValue: CallableFunction;
  callbackSetType: CallableFunction;
  typeOfSearch: string;
}

const SearchBar: FC<SearchBarProps> = ({
  callbackSetValue,
  callbackSetType,
  typeOfSearch,
}) => {
  const [form] = Form.useForm();

  const [radioValue, setRadioValue] = useState(typeOfSearch);

  const onRadioChange = (event: RadioChangeEvent) => {
    setRadioValue(event.target.value);
  };

  const onFinish = (values: any) => {
    callbackSetValue(values.search || "");
    callbackSetType(radioValue);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" className="searchbar-form-row">
      <Form
        className="form"
        layout="vertical"
        form={form}
        name="search-bar"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row className="searchbar-row">
          <Form.Item
            label="Search"
            name="search"
            rules={[
              {
                required: radioValue === "type",
                message: "Please input a value!",
              },
            ]}
          >
            <Input
              placeholder={radioValue === "type" ? "ex. Fire" : "ex. Pikachu"}
            />
          </Form.Item>
          <Form.Item label="Filter by">
            <Radio.Group
              defaultValue={radioValue}
              buttonStyle="solid"
              onChange={onRadioChange}
            >
              <Radio.Button value="name">Name</Radio.Button>
              <Radio.Button value="type">Type</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Row>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Search Pokemons
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default SearchBar;

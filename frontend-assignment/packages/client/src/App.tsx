import React, { FC, useState } from "react";
import { Layout } from "antd";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { Content, Header } from "antd/lib/layout/layout";
import FilterByValue from "./components/FilterByValue";
import FilterByType from "./components/FilterByType";

const App: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [typeOfSearch, setTypeOfSearch] = useState("name");

  return (
    <Layout>
      <Header>
        <h1 className="title">Pokemons Database</h1>
      </Header>
      <Content className="site-layout-content">
        <SearchBar
          callbackSetValue={setSearchValue}
          callbackSetType={setTypeOfSearch}
          typeOfSearch={typeOfSearch}
        />

        {typeOfSearch === "type" ? (
          <FilterByType searchValue={searchValue} />
        ) : (
          <FilterByValue searchValue={searchValue} />
        )}
      </Content>
    </Layout>
  );
};

export default App;

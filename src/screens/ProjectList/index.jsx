import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import * as qs from "qs";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      `${apiURL}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};

const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

import React, { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import Project from "screens/Project";
import { useProjectsSearchParams } from "./util";
import { Button } from "antd";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();

  const debounceParam = useDebounce(param);

  const { isLoading, data: list, retry } = useProject(debounceParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

ProjectList.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

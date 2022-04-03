import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();

  const debounceParam = useDebounce(param);

  const { isLoading, data: list, error } = useProjects(debounceParam);
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <ErrorBox error={error} />
      <List
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

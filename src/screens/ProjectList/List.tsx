import { Table } from "antd";
import React from "react";
import { User } from "screens/ProjectList/SearchPanel";

interface Project {
  id: number;
  name: string;
  personId: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              users.find((user: User) => user.id === project.personId)?.name ||
              "未知"
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};

import { Button, Drawer } from "antd";
import React from "react";

interface ProjectModelProps {
  projectModalOpen: boolean;
  onClose: () => void;
}
const ProjectModal = (props: ProjectModelProps) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width="100%"
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;

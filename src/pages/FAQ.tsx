import React from "react";
import { Typography, Collapse } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page" style={{ width: "800px", maxWidth: "100%" }}>
      <Title>FAQ</Title>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        style={{ background: "#fff" }}
      >
        <Panel header="What is Social It?" key="1">
          <p>
            Social IT is a social networking app designed to help you connect
            with friends, family, and like-minded individuals. Share updates,
            photos, and videos, join communities, and stay connected with the
            people who matter to you.
          </p>
        </Panel>
        <Panel header="Social IT free to use?" key="2">
          <p>
            Yes, Social IT is free to use. However, we offer premium features
            and subscriptions for users who want to enhance their experience.
          </p>
        </Panel>
        <Panel header="How do I update my profile information?" key="3">
          <p>
            To update your profile information, go to your profile page and edit
            personal informations and save. You can update your name, bio,
            profile picture, and other personal details.
          </p>
        </Panel>
        <Panel header="What are communities and how do I join them?" key="4">
          <p>
            Communities are groups of users who share common interests. You can
            join a community by searching for new Groups in "My Groups" page.
          </p>
        </Panel>
        <Panel header="How do I create a new post?" key="5">
          <p>
            To create a new post you can just simply use the button on "My
            Groups" page.
          </p>
        </Panel>
        <Panel
          header="What should I do if the app is not working properly?"
          key="6"
        >
          <p>
            To report a bug or provide feedback please email us at{" "}
            <a href="mailto:support@socialIT.com">Support</a>
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default AboutUs;

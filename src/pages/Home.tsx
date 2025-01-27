import React from "react";
import { Typography } from "antd";
import { RightCircleOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Title>
        Welcome to Social IT <br />{" "}
        <span
          style={{ display: "block", fontSize: "24px", marginBottom: "26px" }}
        >
          Connecting Users all around the world!
        </span>
      </Title>
      <Text style={{ fontSize: "21px" }}>
        <b>Connect. Share. Discover.</b>
      </Text>
      <Text>
        Social IT is your gateway to a world of connections. Join a community of
        like-minded individuals, share your experiences, and discover new
        opportunities.
      </Text>
      <Text style={{ fontSize: "21px" }}>
        <b>Why Social IT?</b>
      </Text>
      <div
        style={{
          border: "2px solid rgb(24, 106, 182)",
          padding: "20px",
          margin: "0 0 20px 0",
          borderRadius: "20px",
          fontSize: "16px",
          lineHeight: "22px",
        }}
      >
        <Text>
          <RightCircleOutlined
            style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
          />{" "}
          <b>Build Your Network </b>
        </Text>
        <Text>
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Connect with friends, family, and colleagues. <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Discover new people with similar interests. <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Expand your professional and social circles.
        </Text>
        <Text>
          <RightCircleOutlined
            style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
          />{" "}
          <b>Share Your Moments</b>
        </Text>
        <Text>
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} /> Post
          updates, photos, and videos.
          <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Express yourself with a variety of content options.
          <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Engage with your community through messages, comments, and shares.
        </Text>
        <Text>
          <RightCircleOutlined
            style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
          />{" "}
          <b>Discover New Interests</b>
        </Text>
        <Text>
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Explore trending topics and join discussions. <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Follow your favorite influencers and creators. <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} /> Stay
          updated with personalized content and recommendations.
        </Text>
        <Text>
          <RightCircleOutlined
            style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
          />{" "}
          <b>Features You'll Love </b>
        </Text>
        <Text>
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          User-Friendly Interface: <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} /> Easy
          to navigate and use. <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Privacy and Security: Your data is safe with us. <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Customizable Profiles: Showcase your personality.
          <br />
          <CheckOutlined style={{ color: "#1d8c26", fontSize: "18px" }} />{" "}
          Events and Groups: Join or create events and groups based on your
          interests.
        </Text>
      </div>
    </div>
  );
};

export default Home;

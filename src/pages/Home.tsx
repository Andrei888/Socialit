import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Title>
        Welcome to Social IT <br /> Connecting Users all around the world!
      </Title>
      <Text>
        <b>Connect. Share. Discover.</b>
      </Text>
      <Text>
        Social IT is your gateway to a world of connections. Join a community of
        like-minded individuals, share your experiences, and discover new
        opportunities.
      </Text>
      <Text>
        <b>Why Social IT?</b>
      </Text>
      <Text>
        <b>Build Your Network </b>
      </Text>
      <Text>
        -Connect with friends, family, and colleagues. <br />
        -Discover new people with similar interests. <br />
        -Expand your professional and social circles.
      </Text>
      <Text>
        <b>Share Your Moments</b>
      </Text>
      <Text>
        - Post updates, photos, and videos.
        <br />- Express yourself with a variety of content options.
        <br />- Engage with your community through messages, comments, and
        shares.
      </Text>
      <Text>
        <b>Discover New Interests</b>
      </Text>
      <Text>
        <br />
        -Explore trending topics and join discussions. <br />
        -Follow your favorite influencers and creators. <br />
        -Stay updated with personalized content and recommendations.
      </Text>
      <Text>
        <b>Features You'll Love </b>
      </Text>
      <Text>
        - User-Friendly Interface: <br />
        - Easy to navigate and use. <br />- Privacy and Security: Your data is
        safe with us. <br />- Customizable Profiles: Showcase your personality.
        <br />- Events and Groups: Join or create events and groups based on
        your interests.
      </Text>
    </div>
  );
};

export default Home;

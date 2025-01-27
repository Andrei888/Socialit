import React from "react";
import { Typography } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ContactUs: React.FC = () => {
  return (
    <div className="about-us-page">
      <Title>Have any questions? Contact Us</Title>
      <div style={{ maxWidth: "100%", width: "600px", lineHeight: "1.5" }}>
        <Text>
          We love to hear from our users! Whether you have questions, feedback,
          or need support, our team is here to help you. Please feel free to
          reach out to us through any of the following methods:
        </Text>
        <Text>
          <b>
            <RightCircleOutlined
              style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
            />{" "}
            General Inquiries{" "}
          </b>
        </Text>
        <Text>
          For general questions or information about our app, email us at:
          info@socialIT.com
        </Text>
        <Text>
          <b>
            <RightCircleOutlined
              style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
            />{" "}
            Support
          </b>
        </Text>
        <Text>
          Experiencing an issue or need help? Our support team is ready to
          assist you. Email us at: support@socialIT.com
        </Text>
        <Text>
          <b>
            <RightCircleOutlined
              style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
            />{" "}
            Feedback
          </b>
        </Text>
        <Text>
          Your feedback is invaluable to us. Help us improve by sharing your
          thoughts and suggestions: feedback@socialIT.com
        </Text>
        <Text>
          <b>
            <RightCircleOutlined
              style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
            />{" "}
            Follow Us
          </b>
        </Text>
        <Text>
          Stay connected and get the latest updates by following us on social
          media:
          <br />
          <b>Twitter:</b> @SocialIT <br />
          <b>Facebook:</b> SocialIT <br />
          <b>Instagram:</b> @SocialIT
        </Text>
        <Text>
          <RightCircleOutlined
            style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
          />{" "}
          <b>Mailing Address</b>
        </Text>
        <Text>
          If you prefer to reach us by mail, you can write to us at: <br />
          SocialIT Inc. <br />
          1234 Social Network Lane <br />
          City, State, ZIP Code <br />
        </Text>
        <Text>
          <RightCircleOutlined
            style={{ color: "rgb(24, 106, 182)", fontSize: "21px" }}
          />{" "}
          <b>Office Hours </b>
        </Text>
        <Text>
          Our team is available Monday through Friday, from 9 AM to 5 PM (Your
          Time Zone).
        </Text>
      </div>
    </div>
  );
};

export default ContactUs;

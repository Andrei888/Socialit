import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page">
      <Title>About Us</Title>
      <section>
        <h2>Our Mission</h2>
        <p>
          At <strong>Social IT</strong>, our mission is to connect people from
          all walks of life, fostering a global community where everyone can
          share, learn, and grow together. We believe in the power of social
          connections to make the world a smaller, more inclusive place.
        </p>
      </section>

      <section>
        <h2>Our Story</h2>
        <p>
          <strong>Social IT</strong> was founded in <strong>2024</strong> with a
          simple idea: to create a space where people can easily connect, share
          their stories, and discover new perspectives. What started as a small
          project has grown into a thriving community of users who inspire us
          every day.
        </p>
      </section>

      <section>
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Community:</strong> We strive to build a supportive and
            inclusive environment where everyone feels welcome.
          </li>
          <li>
            <strong>Innovation:</strong> We are constantly innovating to provide
            the best possible experience for our users.
          </li>
          <li>
            <strong>Privacy and Security:</strong> Your trust is our priority.
            We are committed to protecting your data and ensuring a safe online
            environment.
          </li>
          <li>
            <strong>Transparency:</strong> We believe in being open and honest
            with our users about how our platform works and how we use your
            data.
          </li>
        </ul>
      </section>

      <section>
        <h2>Meet Our Team</h2>
        <p>
          We are a diverse group of passionate individuals dedicated to making{" "}
          <strong>Social IT</strong> the best social networking experience. From
          developers and designers to customer support and community managers,
          our team is here to serve you.
        </p>
        <ul>
          <li>
            <strong>Founder/CEO Name</strong>
            <br /> <em>Founder & CEO</em>
            <br /> Andrei Purcaru
          </li>
        </ul>
      </section>

      <section>
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Personalized Experience:</strong> Tailored content and
            recommendations to suit your interests.
          </li>
          <li>
            <strong>Interactive Features:</strong> Engage with others through
            comments, likes, shares, and direct messaging.
          </li>
          <li>
            <strong>Safe Environment:</strong> Robust privacy settings and
            moderation tools to keep our community safe.
          </li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? Visit our{" "}
          <a href="/contact">Contact Us</a> page to get in touch. We’d love to
          hear from you!
        </p>
      </section>

      <section>
        <h2>Follow Us</h2>
        <p>
          Stay up-to-date with the latest news and updates by following us on
          social media:
        </p>
        <ul>
          <li>
            <a
              href="https://twitter.com/socialIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter: @SocialIT
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/socialIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook: SocialIT
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/socialIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram: @SocialIT
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;

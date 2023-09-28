import React from "react";
import aboutPic from "../../assets/huey2.png";
import "./index.css";

const AboutTheDev = () => {
  return (
    <div className="about-dev-container">
      <p className="about-title">About The Dev</p>
      <div className="about-container">
        <div className="about-content">
          <div>
            <img
              src={aboutPic}
              alt="Huey's portfolio picture"
              className="about-image"
            />
          </div>
          <div className="about-text">
            <h3 className="about-name">Huey Nguyen</h3>
            <p className="about-role">Software Developer</p>
            <p className="about-description">
              A driven software developer on the brink of graduating from
              AppAcademy, Huey has discovered a passion for the world of coding.
              Originally trained as a computer engineer, Huey decided to pivot
              from hardware engineering to software development in 2022. From
              this, he has acquired proficiency in popular development
              technologies such as JavaScript and React, equipping him to create
              dynamic and innovative solutions. Huey's commitment to honing his
              skills extends beyond the screen, as he maintains a balanced
              lifestyle by hitting the gym and enjoying boba outings with
              friends.
            </p>
            <ul className="about-links">
              <li>
                <a href="https://github.com/Syndux" className="about-link">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/huey-nguyen/"
                  className="about-link"
                >
                  <i className="fa-brands fa-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheDev;

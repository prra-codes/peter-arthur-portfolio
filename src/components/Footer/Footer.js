import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div>
      <footer className="footer" id="contact">
        <p className="footer-title">CONTACT</p>

        <a href="mailto:prra@prra.codes" className="footer__link">
          {" "}
          prra@prra.codes
        </a>

        <ul className="social-list">
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://github.com/prra-codes"
              target="_blank"
            >
              <FaGithub />
            </a>
          </li>
          <li className="social-list__item">
            <a className="social-list__link" href="mailto:prra@prra.codes">
              <IoMdMail />
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://www.linkedin.com/in/peter-arthur/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;

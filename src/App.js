import React, { useState, useEffect } from "react";
import logo from "./assets/chrysus.svg";
import roadmap from "./assets/Roadmap.png";
import mailModalBtn from "./assets/Mail.png";
import twitter from "./assets/Twitter.png";
import telegram from "./assets/Telegram.png";
import discord from "./assets/Discord.png";
import medium from "./assets/Medium.png";
import gitlab from "./assets/Linkedin.png";
import close from "./assets/close.png";
import animation from "./assets/background.png";
import whitepaper from "./assets/Chrysus_Whitepaper.pdf";
import "./App.css";
import CountdownTimer from "./helpers/countdownTimer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./helpers/firebase";

const Modal = (show) => {
  const [email, setEmail] = useState("");
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const storeEmail = async () => {
    try {
      const docRef = await addDoc(collection(db, "emails"), {
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
      window.location.reload(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className={showHideClassName}>
      <div className="modal-wrapper">
        <div className="modal-main">
          <p>Join waitlist</p>
          <div className="input">
            <input
              placeholder="Email address"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={storeEmail}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState(CountdownTimer());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(CountdownTimer());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="animated-div">
          <img src={animation} alt="animation" />
        </div>
        {show && <Modal show={showModal} handleClose={hideModal} />}
        <nav>
          <div className="logo">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="btn">
            <a
              href="https://www.slideshare.net/afzalsubhani1991/chrysus-whitepaper-v1"
              target="_blank"
              rel="noreferrer"
            >
              <button className="whitepaperBtn">Read Our Whitepaper</button>
            </a>
          </div>
        </nav>
        <p className="header-title">Approaching in</p>
        <div className="stroke-title">THE NEAR FUTURE</div>
        <div className="header-text">
          <span className="header-text-welcome">Welcome to Chrysus: Unveiling the Golden Code of Financial Freedom</span><br />
          Embrace Trustless Finance, where Gold meets Innovation. Explore our
          decentralized ecosystem designed for seamless transactions, borderless
          commerce. Join us on the path to a 100% Decentralized Future, where
          your financial freedom takes center stage.
        </div>
        <div className="btn-mobile">
            <a
              href="https://www.slideshare.net/afzalsubhani1991/chrysus-whitepaper-v1"
              target="_blank"
              rel="noreferrer"
            >
              <button className="whitepaperBtn">Read Our Whitepaper</button>
            </a>
          </div>
        <div className="roadmap">
          <p>Our Roadmap</p>
          <img src={roadmap} alt="roadmap" />
        </div>
        <ul className="socials">
          <li>
            <a
              href="https://t.me/chrysusofficial"
              target="_blank"
              rel="noreferrer"
            >
              <img src={telegram} alt="telegram" />
            </a>
          </li>
          <li>
            <a
              href="https://discord.com/invite/Kmzp8642"
              target="_blank"
              rel="noreferrer"
            >
              <img src={discord} alt="discord" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/chrysus_coin01"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@chrysus_coin"
              target="_blank"
              rel="noreferrer"
            >
              <img src={medium} alt="facebook" />
            </a>
          </li>
          
        </ul>
        <div className="footer">
          {/* <a
            href="https://medium.com/@chrysusofficial"
            target="_blank"
            rel="noreferrer"
          >
            Learn More
          </a> */}
          {show ? (
            <button onClick={hideModal}>
              <img src={close} alt="roadmap" />
            </button>
          ) : (
            <button onClick={showModal}>
              <img src={mailModalBtn} alt="roadmap" />
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

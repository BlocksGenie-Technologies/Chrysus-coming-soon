import React, { useState, useEffect } from 'react';
import logo from './assets/chrysus.svg';
import roadmap from './assets/Roadmap.png';
import crossBtn from './assets/CrossButton.png';
import twitter from './assets/Twitter.png';
import telegram from './assets/Telegram.png';
import discord from './assets/Discord.png';
import facebook from './assets/Facebook.png';
import gitlab from './assets/Linkedin.png';
import close from './assets/close.png';
import animation from './assets/background.png';
import './App.css';
import CountdownTimer from "./helpers/countdownTimer";
import { collection, addDoc } from "firebase/firestore";
import {db} from './helpers/firebase';

const Modal = (show) => {
  const [email, setEmail] = useState("");
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const storeEmail = async() => {
    try {
      const docRef = await addDoc(collection(db, "emails"), {
        email: email,    
      });
      console.log("Document written with ID: ", docRef.id);
      window.location.reload(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div className={showHideClassName}>
      <div className="modal-wrapper">
        <div className="modal-main">
          <p>Join the Community</p>
          <div className='input'>
            <input placeholder='Email' type="text" 
            onChange={(e)=>setEmail(e.target.value)}/>
            <button onClick={storeEmail}>SUBSCRIBE</button>
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

  const showModal = () => {setShow(true)}

	const hideModal = () => {setShow(false)}
  

  return (
    <div className="App">
      <header className="App-header">
        <div className='animated-div'>
          <img src={animation} alt="animation"/>
        </div>
        { show && <Modal show={showModal} handleClose={hideModal} /> }
        <nav>
          <div className='logo'>
            <img src={logo} className="App-logo" alt="logo" />
            <span>Chrysus</span>
          </div>
          <div className='timer'>
            <div className='box'>
              <p>{timeLeft.days}</p>
              <span>Days</span>
            </div>
            <span className='column'>:</span>
            <div className='box'>
              <p>{timeLeft.hours}</p>
              <span>Hours</span>
            </div>
            <span className='column'>:</span>
            <div className='box'>
              <p>{timeLeft.minutes}</p>
              <span>Minutes</span>
            </div>
            <span className='column'>:</span>
            <div className='box'>
              <p>{timeLeft.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>
        </nav>
        <p className='header-title'>
          COMING SOON
        </p>
        <div className='header-text'>
          Chrysus – God of Gold as money, 100% trustless, decentralized, open source, 
          fungible, divisible, transactable in exchange, commerce and banking. If you'd like to learn more about our project, please take a look at our
          <a href="#" class="whitepaper-button">Whitepaper</a> for in-depth information.
        </div>
        <div className='roadmap'>
          <p>Our Roadmap</p>
          <img src={roadmap} alt="roadmap" />
        </div>
        <ul className='socials'>
          <li>
            <a href="https://t.me/chrysusofficial" target="_blank" rel="noreferrer">
              <img src={telegram} alt="telegram" />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/e7kfZPRa" target="_blank" rel="noreferrer">
              <img src={discord} alt="discord" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/chrysus_coin01" target="_blank" rel="noreferrer">
              <img src={twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/chrysuscoin" target="_blank" rel="noreferrer">
              <img src={facebook} alt="facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/chrysus-gold-coin/" target="_blank" rel="noreferrer">
              <img src={gitlab} alt="gitlab" />
            </a>
          </li>
        </ul>
        <div className='footer'>
          <a href="https://medium.com/@chrysusofficial" target="_blank" rel="noreferrer">Learn More</a>
          { show ? <button onClick={hideModal}><img src={close} alt="roadmap" /></button> : 
          <button onClick={showModal}><img src={crossBtn} alt="roadmap" /></button>}
        </div>
      </header>
    </div>
  );
}

export default App;

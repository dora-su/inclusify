import React, { Component } from "react";
import {Button} from 'react-bootstrap'
import styles from "./landing.module.css";
import logo from "../Header/logo.png";
import illustration from './illustration.png'

export default function LandingPage() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <img className={styles.logo} src={logo} />
        </div>
        <div>
          <h1 className={styles.title}>
            Help make your writing more inclusive, unbiased, and professional.
          </h1>
          <Button href="/app" size="lg">
            Get started
          </Button>
          <img className={styles.picture} src={illustration} />
        </div>
      </div>
    </>
  );
}
// class LandingPage extends React.Component {
//   constructor() {
// 	super();
//    }

//   render() {
//     return (
//         <div>hi</div>

//     );
//   }
// }

// export default LandingPage;

import { useRef } from "react";
import Header from "../../components/header";
import "./style.css";

export default function Home() {
  const middle = useRef(null);

  return (
    <div className="home">
      <Header />

      <div className="home_middle" ref={middle}>
        <br />
        <br />
        <h1>Welcome to</h1>
        <div className="hero-img"></div>
      </div>
    </div>
  );
}

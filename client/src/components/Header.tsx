import torqueLogo from "../imgs/torqueLogo.png";

export default function Header() {
  return (
    <div className="header">
      <div className="header-border-box">
        <img src={torqueLogo} className="torque-logo"></img>
        <div className="header-name">Tuesday</div>
      </div>
    </div>
  );
}

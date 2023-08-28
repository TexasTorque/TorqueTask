import TorqueLogo from "../imgs/TorqueLogo.png";

const Header = () => {
  return (
      <div className="header-border-box">
        <img src={TorqueLogo} className="torque-logo"></img>
        <div className="header-name">TorqueTask</div>
      </div>
  );
}
export default Header;

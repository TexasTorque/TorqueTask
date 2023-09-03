import Header from "../components/Header";
import Image404 from "../imgs/Image404.jpg";
export default () => {
  return (
    <div className="main">
      <Header />
      <div className="not-found">
        <h1 className="not-found-text">Page Not Found?</h1>
        <img src={Image404}></img>
        <h1 className="not-found-text-bottom">Cry about it</h1>
      </div>
    </div>
  );
};

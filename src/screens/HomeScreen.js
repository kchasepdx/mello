import bonfire from "../bonfire.jpg";

function HomeScreen() {
  return (
    <div className="home-screen container-fluid">
      <h1 id="big-mello">mello</h1>
      <p id="landing-p">warm casual clothing for chill nights</p>
      <img id="bonfire" src={bonfire} alt="illustrative"></img>
    </div>
  );
}

export default HomeScreen;

/* <div className="credit">
        Image by{" "}
        <a href="https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2604925">
          StockSnap
        </a>{" "}
        from{" "}
        <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2604925">
          Pixabay
        </a>
      </div>*/

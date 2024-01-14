import React from "react";
import Services from "../components/home/services";
import ContactUs from "../components/home/contactUs";
import JumbotronComponent from "../components/jumbotron/jumbotronComponent";
import data from "../utils/static/homepageContent.json";
import jesusInvites from "../assets/images/jesus_invites.png"

const Home = (props) => {
  return (
    <>
      <JumbotronComponent heading="DRCM Reservations App">
        Brought to you by Divine Youth of Divine Retreat Center, Chalakudy, Kerala.
        <div>
          {/* Sign up and login to start using our services. */}
        </div>
      </JumbotronComponent>
      <section id="bannerHomepage" className="d-flex flex-wrap align-items-center my-5">
        <h2 className="text-dark fs-3">
          "{data.overallQuote}"
        </h2>
        <img src={jesusInvites} alt=""/>
      </section>
      <Services />
      <ContactUs />
    </>
  );
};

Home.propTypes = {};

export default Home;

import Hero from "../components/layout/Hero"
import HomeMenu from "../components/layout/HomeMenu";
import AboutUs from "../components/layout/AboutUs";
import SectionHeader from "../components/layout/SectionHeader";

function Home() {
  return (
    <div>
      <Hero />
      <HomeMenu />
      <AboutUs />
      <section>
        <SectionHeader title={"CONTACT US"} />
        <div className="mt-8">
          <a className="text-lg underline text-gray-500" href="www.google.com">
            topetemi385
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
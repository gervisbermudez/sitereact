import { HomeBanner } from "../components/HomeBanner";
import { HomeBlogList } from "../components/HomeBlogList";
import { HomeExperience } from "../components/HomeExperience";
import { HomePorfolio } from "../components/HomePortfolio";
import { Services } from "../components/Services";

export default function Home() {
  return (
    <div
      id="post-214"
      className="post-214 page type-page status-publish hentry"
    >
      <div className="elementor elementor-214">
        <HomeBanner />
        <HomeExperience />
        <Services />
        <HomePorfolio />
        <HomeBlogList />
      </div>
    </div>
  );
}

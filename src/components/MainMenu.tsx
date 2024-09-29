import { useNavigate } from "react-router-dom";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="art-menu-bar-fix">
      <div className="art-menu-bar">
        <div className="art-menu-bar-frame">
          <div className="art-menu-bar-header">
            <a className="art-menu-bar-btn">
              <span />
            </a>
          </div>
          <div className="art-current-page" />
          <div className="art-scroll-frame">
            <nav id="swupMenu">
              <ul id="menu-main-menu" className="main-menu">
                <li
                  id="menu-item-194"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-214 current_page_item"
                >
                  <a href="index.html">Home</a>
                </li>
                <li
                  id="menu-item-547"
                  className="menu-item menu-item-type-post_type menu-item-object-page"
                >
                  <a
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    Contact
                  </a>
                </li>
                <li
                  id="menu-item-203"
                  className="menu-item menu-item-type-post_type menu-item-object-page"
                >
                  <a href="portfolio/index.html">Portfolio</a>
                </li>
                <li
                  id="menu-item-199"
                  className="menu-item menu-item-type-post_type menu-item-object-page"
                >
                  <a href="index.html%3Fp=215.html">About</a>
                </li>
                <li
                  id="menu-item-195"
                  className="menu-item menu-item-type-post_type menu-item-object-page"
                >
                  <a href="index.html%3Fp=166.html">Blog</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

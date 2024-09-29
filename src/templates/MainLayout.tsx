import Footer from "../components/Footer";
import MainMenu from "../components/MainMenu";

export default function MainLayout({ children} : {children? :React.ReactNode }) {
return <div className="art-app">
  <div className="art-mobile-top-bar" />
  <div className="art-preloader">
    <div className="art-preloader-content">
      <h4>Gervis Bermudez | Blog</h4>
      <div id="preloader" className="art-preloader-load">
        <div className="art-preloader-load-first">
          <svg viewBox="0 0 100 1.7" preserveAspectRatio="none" style={{width: '100%', height: '100%'}}>
            <path d="M 0,0.85 L 100,0.85" stroke="#eee" strokeWidth="1.7" fillOpacity={0} />
          </svg>
          <div className="progressbar-text">0 %</div>
        </div>
      </div>
    </div>
  </div>
  <div className="art-app-wrapper">
    <div className="art-app-container">
      <div className="art-info-bar">
        <div className="art-info-bar-frame">
          <div className="art-info-bar-header">
            <a className="art-info-bar-btn">
              <i className="fas fa-ellipsis-v" />
            </a>
          </div>
          <div className="art-header">
            <div className="art-avatar">
              <a data-no-swup href="uploads/2024/03/IMG-20231214-WA0007-EDIT-scaled.jpg" className="art-avatar-curtain">
                <img src="uploads/2024/03/IMG-20231214-WA0007-EDIT-scaled.jpg" alt="avatar" />
                <i className="fas fa-expand" />
              </a>
              <div className="art-lamp-light">
                <div className="art-available-lamp" title="I am available for freelance hire" />
              </div>
            </div>
            <h5 className="art-name mb-10">
              <a href="index.html">Gervis Bermudez</a>
            </h5>
            <div className="art-sm-text">
              Front-end Developer<br />
              Ui/UX Designer
            </div>
          </div>
          <div className="art-ls-social">
            <a href="https://www.linkedin.com/in/gervisbermudez/" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/gervisbermudez" target="_blank">
              <i className="fab fa-github" />
            </a>
            <a href="https://twitter.com/gervisbermudez" target="_blank">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://www.instagram.com/gervisbermudez" target="_blank">
              <i className="fab fa-instagram" />
            </a>
          </div>
          <div id="scrollbar2" className="art-scroll-frame">
            <div className="art-table p-15-15">
              <ul>
                <li>
                  <h6>Residence:</h6>
                  <span>Argentina</span>
                </li>
                <li>
                  <h6>City:</h6>
                  <span>Buenos Aires</span>
                </li>
                <li>
                  <h6>Age:</h6>
                  <span>30</span>
                </li>
              </ul>
            </div>
            <div className="art-ls-divider" />
            <div className="art-lang-skills p-30-15">
              <div className="art-lang-skills-item">
                <div id="circleprog1-1" data-type="circles" data-value={70} className="art-cirkle-progress art-skills-progress" />
                <h6>English</h6>
              </div>
              <div className="art-lang-skills-item">
                <div id="circleprog1-2" data-type="circles" data-value={90} className="art-cirkle-progress art-skills-progress" />
                <h6>Spanish</h6>
              </div>
            </div>
            <div className="art-ls-divider" />
            <div className="art-hard-skills p-30-15">
              <div className="art-hard-skills-item">
                <div className="art-skill-heading">
                  <h6>React / Redux</h6>
                </div>
                <div className="art-line-progress">
                  <div id="lineprog2-1" data-type="progress" data-value={90} className="art-skills-progress" />
                </div>
              </div>
              <div className="art-hard-skills-item">
                <div className="art-skill-heading">
                  <h6>Node / Typescript</h6>
                </div>
                <div className="art-line-progress">
                  <div id="lineprog2-2" data-type="progress" data-value={95} className="art-skills-progress" />
                </div>
              </div>
              <div className="art-hard-skills-item">
                <div className="art-skill-heading">
                  <h6>PHP / Laravel</h6>
                </div>
                <div className="art-line-progress">
                  <div id="lineprog2-3" data-type="progress" data-value={75} className="art-skills-progress" />
                </div>
              </div>
              <div className="art-hard-skills-item">
                <div className="art-skill-heading">
                  <h6>Figma / Xd</h6>
                </div>
                <div className="art-line-progress">
                  <div id="lineprog2-4" data-type="progress" data-value={65} className="art-skills-progress" />
                </div>
              </div>
              <div className="art-hard-skills-item">
                <div className="art-skill-heading">
                  <h6>mongodb / Firebase</h6>
                </div>
                <div className="art-line-progress">
                  <div id="lineprog2-5" data-type="progress" data-value={85} className="art-skills-progress" />
                </div>
              </div>
            </div>
            <div className="art-ls-divider" />
            <ul className="art-knowledge-list p-15-0">
              <li><i className="fas fa-check" />React, Angular, Vue</li>
              <li><i className="fas fa-check" />Stylus, Sass, Less</li>
              <li><i className="fas fa-check" />Gulp, Webpack, Grunt</li>
              <li><i className="fas fa-check" />GIT knowledge</li>
            </ul>
            <div className="art-ls-divider" />
            <div className="art-links-frame p-15-15">
              <a href="https://drive.google.com/file/d/1HX1dwdB4p_KxrndF8hfC5WTwWEGpzuU4/view?usp=sharing" className="art-link" target="_blank">
                Download cv <i className="fas fa-download" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <MainMenu />
      <div className="art-content">
        <div className="art-curtain" />
        <div className="art-top-bg" style={{backgroundImage: 'url(uploads/2024/03/luca-bravo-XJXWbfSo2f0-unsplash-2.jpg)'}}>
          <div className="art-top-bg-overlay" />
        </div>
        <div className="transition-fade" id="swup">
          <div id="scrollbar" className="art-scroll-frame">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

}
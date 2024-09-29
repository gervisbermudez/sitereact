import useContact from "../hooks";

export function HomeBanner() {
  const { handleContactBtn } = useContact();

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-82626cb elementor-section-full_width elementor-section-height-default elementor-section-height-default"
      data-id="82626cb"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-no">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7920c75"
          data-id="7920c75"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-cf9af66 elementor-widget elementor-widget-arter-hero-banner"
              data-id="cf9af66"
              data-element_type="widget"
              data-widget_type="arter-hero-banner.default"
            >
              <div className="elementor-widget-container">
                <div className="container-fluid">
                  <div className="row p-30-0 p-lg-30-0 p-md-15-0">
                    <div className="col-lg-12">
                      <div
                        className="art-a art-banner"
                        style={{
                          backgroundImage:
                            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        }}
                      >
                        <div className="art-banner-back" />
                        <div className="art-banner-dec" />
                        <div className="art-banner-overlay">
                          <div className="art-banner-title">
                            <h1 className="art-banner-title-h mb-15">
                              <span>
                                {" "}
                                I'm Developer
                                <br />{" "}
                              </span>
                            </h1>
                            <div className="art-lg-text art-code mb-25">
                              &lt;<i>code</i>&gt; I build
                              <span
                                className="txt-rotate"
                                data-period={2000}
                                data-rotate='[ "web applications","ios and android applications.","design mockups.","automation tools." ]'
                              />
                              &lt;/<i>code</i>&gt;
                              <br />
                              <br />
                              <br />
                            </div>
                            <div className="art-buttons-frame">
                              <a
                                href="#!"
                                onClick={handleContactBtn}
                                className="art-btn art-btn-md"
                              >
                                <span>Contact me</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

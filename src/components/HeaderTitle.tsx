export function HeaderTitle({ title }: { title?: string }) {
  if (!title) {
    return null;
  }  
  return (
    <div className="container-fluid">
      <div className="row p-30-0">
        <div className="col-lg-12">
          <div className="art-section-title">
            <div className="art-title-frame">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

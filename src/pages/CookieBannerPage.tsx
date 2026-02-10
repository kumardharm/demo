// @ts-nocheck
const CookieBannerPage = () => {
  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none" aria-label="Page header">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Cookie banner</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                This page demonstrates the cookie banner. It will stay visible until the user accepts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBannerPage;

export default function Footer() {
    const year = new Date().getFullYear();
    return <div className="container-fluid">
    <footer className="footer">
      <div>© {year} All Rights Reserved.</div>
      <div>
        Email:
        <a href="mailto:gervisbermudez@outlook.com" target="_blank">gervisbermudez@outlook.com</a>
      </div>
    </footer>
  </div>
}
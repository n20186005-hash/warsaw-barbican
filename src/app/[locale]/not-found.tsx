import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  return (
    <div className="policy-page">
      <div className="container" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p className="updated">Page not found</p>
        <Link href="/" className="btn btn-primary" style={{ display: "inline-flex" }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

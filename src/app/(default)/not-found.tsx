import { Heading } from "@/components/ui/heading";

function NotFoundPage() {
  return (
    <section className="not-found">
      <Heading size="large">404 - Page Not Found </Heading>
      <div className="main-content">
        <p>You&apos;ve come to a page that doesn&apos;t exist :(</p>
        <p>
          Try one of the options at the top of the page, or{" "}
          <a href="/contact/#">get in contact</a>.
        </p>
      </div>
    </section>
  );
}

export default NotFoundPage;

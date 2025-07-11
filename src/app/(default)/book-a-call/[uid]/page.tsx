import { CallBooker } from "@/components/features/call-booker";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { Hero } from "@/components/ui/hero";

import { reps } from "../data";
import styles from "./book-a-call.module.scss";

const BookACallUserPage = async ({ params, searchParams }) => {
  const rb = searchParams.rb;
  const uid = Number(params.uid);
  const rep = reps.find((r) => r.hermes_admin_id === uid);

  const errorComponent = (
    <Body containerSize="medium" background="cream">
      <p className="text-center">
        Invalid support link. Please contact your account manager to request a new support link.
      </p>
    </Body>
  );

  if (!rep) return errorComponent;

  if (rep.is_support) {
    const company_id = Number(searchParams.company_id);
    const e = Number(searchParams.e);
    const s = searchParams.s;

    if (!company_id || !e || !s) {
      return errorComponent;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/callbooker/support-link/validate/?admin_id=${uid}&company_id=${company_id}&e=${e}&s=${s}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        return errorComponent;
      }
    } catch {
      return errorComponent;
    }
  }

  return (
    <>
      <Hero heading="Book a call" />
      <Body containerSize="medium" background="cream">
        <div className="grid-container columns--2">
          <div>
            <Heading size="xsmall" noMargin>
              Your new business partner in tutoring
            </Heading>
            <p>
              Let us take care of the technology while you focus on what you do
              best. We work hand in hand with you through setup and installation
              to make sure that our software adapts to your business needs, not
              the other way around.
            </p>
            <p>
              Talk to us about how we can supercharge your CRM, lesson bookings,
              online classrooms, invoicing and much more.
            </p>
            <ul className={styles.ticksList}>
              <li>
                <p>
                  <b>Get paid on time and increase your profit</b>
                </p>
                <p>
                  Automate your invoicing safely and securely. We&apos;ll chase
                  late payments from your clients.
                </p>
              </li>
              <li>
                <p>
                  <b>Spend less time scheduling</b>
                </p>
                <p>
                  Let your clients book lessons directly with you through their
                  personal logins. We&apos;ll send them reminders and online
                  classroom URLs.
                </p>
              </li>
              <li>
                <p>
                  <b>Add to your competitive advantage</b>
                </p>
                <p>
                  Our features are designed to empower ambitious companies,
                  whether they&apos;re sole traders or large tutoring
                  franchises.
                </p>
              </li>
              <li>
                <p>
                  <b>Maintain a consistent online brand</b>
                </p>
                <p>
                  Redesign TutorCruncher to match your branding. Change the
                  color scheme, page content, even the functionality whenever it
                  suits you.
                </p>
              </li>
              <li>
                <p>
                  <b>Build a trusting relationship with us</b>
                </p>
                <p>
                  Trust and communication are vital to a successful partnership.
                  We like to get to know every business that we work with and
                  you&apos;ll always get an honest answer from us.
                </p>
              </li>
            </ul>
          </div>
          <CallBooker rep={rep} rb={rb} />
        </div>
      </Body>
    </>
  );
};

export async function generateStaticParams() {
  return reps.map((rep) => ({
    uid: String(rep.hermes_admin_id),
  }));
}

export default BookACallUserPage;
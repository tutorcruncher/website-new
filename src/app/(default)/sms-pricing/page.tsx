import { Hero } from "@/components/ui/hero";
import { Body } from "@/components/ui/body";
import { getSmsPricing } from "@/lib/sms-data";
import { Metadata } from "next";
import { formatMetaData } from "@/helpers/metaData";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const url = `https://tutorcruncher.com`;

  return formatMetaData("SMS Pricing | TutorCruncher", "", url);
}

export default async function PricingPage() {
  const smsPricing = await getSmsPricing();
  const sortedData = smsPricing.sort((a, b) => b.priority - a.priority);
  return (
    <>
      <Hero heading="SMS Pricing" />
      <Body>
        <p className="text-center">
          Some countries listed below may display a price range as costs vary
          depending on the recipient&apos;s mobile carrier.
          <br /> The cost of all sent SMSs can be viewed from within
          TutorCruncher.
        </p>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Price ($)</th>
              <th>Price (£)</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((country) => (
              <tr key={country.country}>
                <td className="feature-name">{country.country}</td>
                <td>
                  $ {country.usd_price} {country.is_range && "*"}
                </td>
                <td>£{country.gbp_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-center">
          <i>*</i> Costs vary depending on the recipient carrier within the
          country you are sending to.
        </p>
      </Body>
    </>
  );
}

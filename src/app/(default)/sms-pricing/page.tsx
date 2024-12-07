import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";

import { SMS_PRICING } from "./data";
import { WebApplicationSchema } from "@/schema/web_application";

const PricingPage = () => {
  const sortedData = [...SMS_PRICING].sort((a, b) => b.priority - a.priority);
  return (
    <>
      <WebApplicationSchema />
      <Hero heading="SMS Pricing" />
      <Body>
        <p className="text-center">
          Some countries listed below may display a price range as costs vary
          depending on the recipient's mobile carrier. The cost of all sent SMSs
          can be viewed from within TutorCruncher.
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
};

export default PricingPage;

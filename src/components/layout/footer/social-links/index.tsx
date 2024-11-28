import { IconButtonLink } from "@/components/ui/icon-button-link";
import { Facebook } from "@/svgs/facebook";
import { LinkedIn } from "@/svgs/linkedin";
import { Twitter } from "@/svgs/twitter";

export const socials = [
  {
    outlet: "Facebook",
    href: "https://www.facebook.com/TutorCruncher",
    label: "Visit our Facebook page",
    icon: <Facebook />,
  },
  {
    outlet: "Twitter",
    href: "https://twitter.com/TutorCruncher",
    label: "Visit our Twitter profile",
    icon: <Twitter />,
  },
  {
    outlet: "LinkedIn",
    href: "https://www.linkedin.com/company/tutorcruncher",
    label: "Visit our LinkedIn profile",
    icon: <LinkedIn />,
  },
];

export const FooterSocialLinks = () => {
  return (
    <>
      {socials.map((social) => (
        <IconButtonLink
          key={social.outlet}
          href={social.href}
          ariaLabel={social.label}
        >
          {social.icon}
        </IconButtonLink>
      ))}
    </>
  );
};

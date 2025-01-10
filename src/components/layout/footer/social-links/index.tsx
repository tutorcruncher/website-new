import { IconButtonLink } from "@/components/ui/icon-button-link";
import { Facebook } from "@/svgs/facebook";
import { LinkedIn } from "@/svgs/linkedin";
import { Github } from "@/svgs/github";

const socials = [
  {
    outlet: "Facebook",
    href: "https://www.facebook.com/TutorCruncher",
    label: "Visit our Facebook page",
    icon: <Facebook />,
  },
  {
    outlet: "Github",
    href: "https://github.com/tutorcruncher/",
    label: "Visit our github profile",
    icon: <Github />,
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

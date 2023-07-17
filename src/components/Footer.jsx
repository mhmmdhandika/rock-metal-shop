import {
  AiOutlineInstagram as InstagramIcon,
  AiOutlineFacebook as FacebookIcon,
} from "react-icons/ai";
import { RxTwitterLogo as TwitterIcon } from "react-icons/rx";
import { ImPinterest2 as PinterestIcon } from "react-icons/im";
import {
  MdLocationOn as LocationIcon,
  MdEmail as EmailIcon,
} from "react-icons/md";
import { BsFillTelephoneFill as TelephoneIcon } from "react-icons/bs";

function Footer() {
  const usefulLinks = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Man Fashion",
      href: "#",
    },
    {
      name: "Accessories",
      href: "#",
    },
    {
      name: "Order Tracking",
      href: "#",
    },
    {
      name: "Wishlist",
      href: "#",
    },
    {
      name: "Cart",
      href: "#",
    },
    {
      name: "Woman fashion",
      href: "#",
    },
    {
      name: "My Account",
      href: "#",
    },
    {
      name: "Wishlist",
      href: "#",
    },
    {
      name: "Terms",
      href: "#",
    },
  ];

  const contact = [
    {
      name: "Location",
      value: "Kabupaten Bekasi, Jawa Barat 17634",
      icon: LocationIcon,
    },
    {
      name: "Telephone",
      value: "+62-8123-4567",
      icon: TelephoneIcon,
    },
    {
      name: "Email",
      value: "contact@gmail.com",
      icon: EmailIcon,
    },
  ];

  return (
    <footer>
      <div className="section-space-x grid justify-center gap-10 px-5 py-5 md:grid-cols-3">
        <div className="flex flex-col justify-center gap-5 md:justify-start">
          <h2 className="text-3xl font-semibold">Thunderstone Emporium</h2>
          <p className="text-sm">
            Experience the perfect blend of nature's raw power and metal's
            relentless energy at our online Rock Shop Metal Store. Discover
            high-quality rocks, minerals, and gemstones sourced globally, along
            with metal-themed merchandise. Unleash your inner rock star and
            embrace the connection between rock and metal at our ultimate online
            destination.
          </p>
          <div className="flex gap-3">
            <InstagramIcon size={35} />
            <FacebookIcon size={35} />
            <TwitterIcon size={35} />
            <PinterestIcon size={35} />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5 md:justify-start">
          <h3 className="text-lg font-semibold">Useful Links</h3>
          <ul className="flex h-[10rem] flex-col flex-wrap gap-2">
            {usefulLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-5 md:justify-start">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="flex flex-col gap-2">
            {contact.map((item, index) => (
              <li key={index} className="flex gap-3">
                <item.icon size={20} />
                <p>{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

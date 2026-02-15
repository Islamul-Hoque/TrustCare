import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "./Logo";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-base-content ">
      <Container>
        <div>
      <div className=" px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
         <Logo/>
          <p>
            Trusted caregiving for children, elderly, and sick family members.
            Easy, secure, and accessible booking.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-bold mb-3">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="link link-hover">
                Services
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="link link-hover">
                My Bookings
              </Link>
            </li>
            <li>
              <Link href="/contact" className="link link-hover">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <Link href="#" className="btn btn-circle btn-outline btn-sm">
              <FaFacebookF />
            </Link>
            <Link href="#" className="btn btn-circle btn-outline btn-sm">
              <FaTwitter />
            </Link>
            <Link href="#" className="btn btn-circle btn-outline btn-sm">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} TrustCare. All rights reserved.
      </div>
      </div>
      </Container>
    </footer>
  );
};

export default Footer;
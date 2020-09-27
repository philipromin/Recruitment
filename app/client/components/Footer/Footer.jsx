import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYandex } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="flex flex-row justify-between h-48 px-20 py-10 bg-recruitment-blue">
      <Link href="/">
        <a>
          <FontAwesomeIcon icon={faYandex} size="3x" color="white" />
        </a>
      </Link>
      <div className="flex flex-row text-white">
        <ul className="w-32 mr-4">
          <li>Company</li>
          <hr />
          <li>About Us</li>
          <li>FAQ</li>
          <li>XX</li>
        </ul>
        <ul className="w-32">
          <li>Inquires </li>
          <hr />
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Contact</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

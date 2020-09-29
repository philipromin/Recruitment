import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYandex } from '@fortawesome/free-brands-svg-icons';

const Header = ({ currentUser }) => {
  return (
    <header className="flex items-center justify-between w-screen h-20 px-20 py-4">
      <Link href="/jobs">
        <a>
          <FontAwesomeIcon icon={faYandex} size="3x" color="#0058A2" />
        </a>
      </Link>
      <div className="flex flex-row gap-2 font-semibold text-recruitment-black">
        {!currentUser ? (
          <>
            <Link href="/login">
              <a className="hover:text-recruitment-blue">Sign in </a>
            </Link>
            <Link href="/register">
              <a className="hover:text-recruitment-blue">Sign up </a>
            </Link>
          </>
        ) : (
          <Link href="/logout">
            <a className="hover:text-recruitment-blue">Sign out </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

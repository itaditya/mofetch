import Link from 'next/link';

import { fetch } from '../utils/mofetch';

const About = (props) => {
  return (
    <ul>
      {props.users.map((user) => (
        <li key={user.id}>
          <Link href="/users/[id]" as={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

About.getInitialProps = async function () {
  const resUsers = await fetch('/api/users');
  const users = await resUsers.json();

  return {
    users,
  };
};

export default About;

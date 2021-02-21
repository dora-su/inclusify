
import { Link } from 'react-router-dom';

import './header.css';

const HeaderLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);
  if(page==='')return <Link className="headerlink-title" to={`/${page}`}>Home</Link>;
  return <Link className="headerlink-title" to={`/${page}`}>{title}</Link>;
};

export default HeaderLink;
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import logoImg from "../images/home/logo.svg";
// import arrowWhiteImg from "../images/home/arrow_white.svg";
// import arrowBlackImg from "../images/home/arrow_black.svg";
// import menuBlackImg from "../images/home/mobile-menu_black.svg";
import menuWhiteImg from "../images/home/mobile-menu_white.svg";

const links = [
  { title: 'Academy', link: '/academy', target: '_self'},
  { title: 'Governance', link: 'https://app.opium.finance/governance', target: '_blank'},
  { title: 'Blog', link: '/blog', target: '_self'},
  { title: 'Protocol', link: 'https://www.opium.network/', target: '_blank'}
];

const HeaderSection = styled.div`
  background-color: #0a0a1e;
  z-index: 1;

  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .section-inner {
    max-width: 68rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.3125rem 1.25rem;
  }

  @media (max-width: 768px) {
    .desktop-version {
      display: none;
    }
  }

`;

const LeftSection = styled.div`
  .logo-link {
    margin-right: 30px;
  }

  img {
    margin: 0;
  }
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;

  .text-link {
    font-family: 'Titillium Web', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 21px;
    text-align: right;
    text-transform: uppercase;
    color: #FFFFFF;
    margin: 0 15px;
    padding: 0.5rem 0.375rem;
    border-radius: 8px;

    &:hover {
      background-color: #383848;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  a {
    border: 1px solid #197CD8;      
    border-radius: 1.875rem;
    font-family: 'Titillium Web', sans-serif;
    font-weight: bold;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: white;
    padding: 6px 20px;
    min-width: 141px;
    background-color: #197CD8;
    cursor: pointer;
    margin-right: 20px;
    text-align: center;

    &:hover {
      background-color: transparent;
      color: #197CD8;
    }
  }

  .lang-change {
    font-family: 'Titillium Web', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    display: flex;
    align-items: center;

    span {
      margin-right: 10px;
    }
  }

  img {
    margin: 0;
  }
`;

const MobileHeader = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  position: relative;

  .mobile-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 21px 20px;

    img {
      margin: 0
    }
  }

  .mobile-menu {
    position: fixed;    
    width: 100%;
    padding: 20px;
    background-color: #0a0a1e;
    border-top: 1px solid lightgray;
    z-index: 1;
  }

  .text-link {
    font-family: 'Titillium Web', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    text-align: right;
    text-transform: uppercase;
    color: white;
    margin: 10px 0;
  }

  button {
    border: 1px solid #197CD8;      
    border-radius: 30px;
    font-family: 'Titillium Web', sans-serif;
    font-weight: bold;
    font-size: 12px;
    line-height: 20px;
    color: #197CD8;
    padding: 10px;
    min-width: 141px;
    background-color: transparent;
    cursor: pointer;
    margin-top: 15px;
  }

  .lang-change {
    font-family: 'Titillium Web', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #0a0a1e;
    display: flex;
    align-items: center;
    margin-top: 15px;

    span {
      margin-right: 10px;
    }

    img {
      margin: 0;
    }
  }  
`


const useOnClickOutside = (ref, handler, exceptional) => {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target) || exceptional.current.contains(event.target) ) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    [ref, handler, exceptional]
  );
}

const Header = () => {
  const [sticky, setSticky] = useState();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const ref = useRef();
  const exceptional = useRef();

  useOnClickOutside(ref, () => setShowMobileMenu(false), exceptional);

  const handleScroll = () => {
    if(window.pageYOffset > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleShowMobile = () => {
    setShowMobileMenu(!showMobileMenu);
  };


  return (
    <HeaderSection className={sticky ? "sticky" : ""}>
      <div className="section-inner desktop-version">
        <LeftSection>
          <a href="/" className="logo-link">
            <img src={logoImg} alt=""/>
          </a>          
        </LeftSection>
        <CenterSection>
          {
            links.map((item, index) => (
              <a href={item.link} key={index} className="text-link" target={item.target}>{item.title}</a>
            ))
          }
        </CenterSection>
        <RightSection>
          <a href='https://app.opium.finance' target='_blank' rel="noopener noreferrer">TRY NOW</a>
          {/* <div className="lang-change">
            <span>EN</span>
            <img src={arrowWhiteImg} alt=""/>
          </div> */}
        </RightSection>
      </div>
      <MobileHeader>
        <div className="mobile-nav">
          <a href="/" className="logo-link">
            <img src={logoImg} alt=""/>
          </a>
          <img src={menuWhiteImg} alt="" onClick={handleShowMobile} ref={exceptional}/>
        </div>
        {
          showMobileMenu &&  
            <div className={`mobile-menu ${sticky ? "sticky" : ""}`} ref={ref}>
              {
                links.map((item, index) => (
                  <div key={index}>
                    <a href={item.link} className="text-link">{item.title}</a>
                  </div>                 
                ))
              }
              {/* <div>
                <button>GO TO APP</button>
              </div> */}
              {/* <div className="lang-change">
                <span>EN</span>
                <img src={arrowBlackImg} alt=""/>
              </div> */}
            </div>
        }
      </MobileHeader>      
    </HeaderSection>
  )
}

export default Header;

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

// cmps
import { SvgIcon } from '../cmps/SvgIcon'
import { VideoLama } from '../cmps/HomePageCmps/VideoLama'

// img
import logoImg from '/img/logo.png'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer'

export function HomePage() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    const headerRef = useRef(null)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    function toggleIsMobileNavOpen() {
        setIsMobileNavOpen(!isMobileNavOpen)
    }

    function onLoginGuest() {
        const guest = {
            fullname: 'Guest User',
            isAdmin: false,
        }
        dispatch({ type: SET_USER, user: guest })
        sessionStorage.setItem('loggedinUser', JSON.stringify(guest))
        navigate('/board')
    }


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                headerRef.current?.classList.add('scrolled')
            } else {
                headerRef.current?.classList.remove('scrolled')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    return (
        <section className="home-page">
            <header className="home-page-header" ref={headerRef}>

                <Link to='/' className="home-page-logo flex ">
                    <img src={logoImg} alt="site-logo" className='home-page-logo-icon' />
                    <div>
                        <span className="big-text">oneday</span>
                        <span className="small-text">.com</span>
                    </div>
                </Link>


                <nav className={`home-page-header-nav ${isMobileNavOpen ? "nav-open" : ""}`}>
                    <div>
                        {['Products', 'Solutions', 'Resources', 'Enterprise'].map(navbtn => {
                            return <NavLink to='/' key={navbtn} className='btn nav-heaer-btn'>
                                <span>{navbtn}</span>

                            </NavLink>
                        })}
                    </div>

                    <div className='flex align-center'>
                        <div>
                            <Link to="/auth/login" className='btn nav-heaer-btn login'>
                                Login
                            </Link>
                        </div>

                        <button className='btn get-started-btn' onClick={onLoginGuest}>
                            <span>
                                Get Started
                            </span>
                            <SvgIcon iconName="arrowRight" size={12} colorName="currentColor" />
                        </button>

                    </div>
                </nav>

                <button
                    className={`transparent mobile-nav-btn ${isMobileNavOpen ? "nav-open" : ""}`}
                    onClick={toggleIsMobileNavOpen}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </button>

            </header>

            <main className="home-page-main-content">

                <div className='welcome-box'>
                    <h1>
                        OneDay work platform <br></br>
                        for any kind of work
                    </h1>
                    <h2>Plan and execute work across projects, sales, marketing, IT,<br></br>
                        and engineering with a unified, AI-first product suite.</h2>

                    <button className='btn get-started-btn' onClick={onLoginGuest}>
                        <span>
                            Get Started
                        </span>
                        <SvgIcon iconName="arrowRight" size={12} colorName="currentColor" />
                    </button>

                </div>

                <VideoLama onLoginGuest={onLoginGuest} />

            </main>

            <footer className="home-page-footer">
                <div>All Rights Reserved © oneday.com</div>
            </footer>
        </section >
    )
}


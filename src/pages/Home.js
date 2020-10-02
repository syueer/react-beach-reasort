import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'
// import styledHero from '../components/StyledHero'


const Home = () => {
    return (
        <React.Fragment>
            <Hero>
                <Banner title="luxurious room" subtitle="deluxe rooms strating at $299">
                    <Link to='/rooms' className="btn-primary">
                        our rooms
                </Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />
            {/* <StyledHero> Hello </StyledHero> */}
        </React.Fragment>
    )
}

export default Home

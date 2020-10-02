import React from 'react'
import Title from './Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa"
import Service from './Service'

const Services = () => {
    return (
        <section className="services">
            <Title title="Service" />
            <div className="services-center">
                <Service icon={<FaCocktail />} title="free cocktail" info="lorem " />
                <Service icon={<FaHiking />} title="Endless Hiking" info="lorem " />
                <Service icon={<FaShuttleVan />} title="Free shuttle" info="lorem " />
                <Service icon={<FaBeer />} title=" Storongest Beer" info="lorem " />
            </div>
        </section>
    )
}

export default Services

import React, { useContext } from 'react'
import Title from './Title'
import { RoomContext } from '../context'
import Loading from './Loading'
import Room from './Room'

const FeaturedRooms = () => {
    const value = useContext(RoomContext)
    let { loading, featuredRooms } = value
    let rooms = featuredRooms.map(room => {
        return <Room key={room.id} room={room} />
    })
    return (
        <section className="featured-room">
            <Title title="Featured rooms" />
            <div className="featured-rooms-center">
                {/* {featuredRooms} */}
                {loading ? <Loading /> : rooms}
            </div>

        </section>
    )
}

export default FeaturedRooms

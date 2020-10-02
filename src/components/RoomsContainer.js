import React, { useContext } from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { RoomContext } from '../context'
import Loading from './Loading'


const RoomsContainer = () => {
    const value = useContext(RoomContext)
    const { loading, sortedRooms, rooms } = value


    if (loading) {
        return <Loading />
    } else {

        return (
            <div>
                <RoomsFilter rooms={rooms} />
                <RoomsList rooms={sortedRooms} />
            </div>
        )

    }
}


export default RoomsContainer

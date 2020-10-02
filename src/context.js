import React, { useState, useEffect } from 'react'
// import items from './data'
import Client from './contentful'


// .then((response) => console.log(response.items))
// .catch(console.error)

export const RoomContext = React.createContext();

export const RoomProvider = ({ children }) => {
    const [state, setState] = useState({
        rooms: [], sortedRooms: [], featuredRooms: [], loading: true,
        type: 'all', capacity: 1, price: 0, minPrice: 0, maxPrice: 0, minSize: 0, maxSize: 0, breakfast: false, pets: false
    })
    const formData = (items) => {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = { ...item.fields, id, images }
            return room
        });
        return tempItems;
    }

    const getRoom = (slug) => {
        let tempRooms = [...state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await Client.getEntries({ content_type: 'beachResortRoom', order: 'fields.size' })
                console.log(response.items)
                let rooms = formData(response.items);
                console.log(rooms)
                let featuredRooms = rooms.filter(room => room.featured === true)
                let maxPrice = Math.max(...rooms.map(item => item.price))
                let maxSize = Math.max(...rooms.map(item => item.size))
                setState(
                    prevState => ({
                        ...prevState,
                        rooms: rooms, featuredRooms: featuredRooms, sortedRooms: rooms,
                        loading: false, price: maxPrice, maxPrice, maxSize
                    }))
            }
            catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])




    const handleChange = (e) => {
        // console.log(e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        // const value = e.target.value
        const name = e.target.name
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }



    useEffect(() => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = state
        let tempRooms = [...rooms];

        capacity = parseInt(capacity)
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        // filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        //filter by roomsize
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //filter by checked box
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        // change state
        setState(prevState => ({
            ...prevState,
            sortedRooms: tempRooms
        }))
        // eslint-disable-next-line
    }, [state.type, state.price, state.capacity, state.maxPrice, state.minPrice, state.breakfast, state.pets])

    return (

        <RoomContext.Provider value={{ ...state, getRoom: getRoom, handleChange: handleChange }}>
            {children}
        </RoomContext.Provider>

    )
}
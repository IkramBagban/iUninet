import React from 'react'
import Input from '../UI/Input'


const ChatSidebar = () => {
    const dummyData = [
        {
            id: 1,
            name: 'Ikram Bagban',
            time: '9:24 PM',
            message: 'Lorem ipsum dolor sit, amet...'
        },
        {
            id: 2,
            name: 'John Doe',
            time: '9:30 PM',
            message: 'Ut enim ad minim veniam...'
        },
        {
            id: 3,
            name: 'Alice Smith',
            time: '10:00 PM',
            message: 'Duis aute irure dolo...'
        },
        {
            id: 4,
            name: 'Emily Brown',
            time: '10:15 PM',
            message: 'Excepteur sint occaecat...'
        },
        {
            id: 5,
            name: 'Michael Johnson',
            time: '10:30 PM',
            message: 'Sed do eiusmod tempor incididun...'
        },
        {
            id: 6,
            name: 'Sarah Williams',
            time: '11:00 PM',
            message: 'Consectetur adipiscing elit,...'
        },
        {
            id: 7,
            name: 'David Miller',
            time: '11:30 PM',
            message: 'Nemo enim ipsam voluptatem...'
        },
    ];

    return (
        <div>
            <div className='m-2 '>
                <input type="text" placeholder='Search...' className='w-[100%] h-[2rem] px-2 rounded-md bg-[#e6e9e6] text-black ' />
            </div>

            <div>
                {dummyData.map(chat => (

                    <div className='flex w-[100%] h-[3rem] border box-border'>
                        <div className='w-[2.5rem] h-[2.5rem] rounded-full border border-black bg-grey m-1'></div>
                        <div className='w-[100%] cursor-pointer'  onClick={()=> console.log('clicked user '+ chat.name)}>
                            <div className='flex justify-between'>
                                <div className='font-medium'>{chat.name}</div>
                                <p className='me-2 text-[grey]'>{chat.time}</p>
                            </div>
                            <p className='font-thin text-sm'>{chat.message}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ChatSidebar
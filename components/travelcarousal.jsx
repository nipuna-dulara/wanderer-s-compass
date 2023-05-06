import React from 'react';

const TravelPlansComponent = () => {
    const travelPlans = [
        {
            title: 'Beach Getaway',
            description: 'Relax and unwind on pristine sandy beaches with crystal-clear waters.',
            image: 'beach-image.jpg'
        },
        {
            title: 'Mountain Expedition',
            description: 'Embark on a thrilling adventure and conquer majestic peaks.',
            image: 'mountain-image.jpg'
        },
        {
            title: 'Cultural Immersion',
            description: 'Immerse yourself in diverse cultures and experience vibrant city life.',
            image: 'city-image.jpg'
        }
    ];

    return (
        <div className='content-center w-fit'>
            <p className='text-2xl font-bold'>places</p>

            <div className="flex overflow-x-scroll space-x-4 p-4">
                {travelPlans.map((plan, index) => (
                    <div key={index} className="flex-shrink-0 w-64 bg-gray-200 rounded-lg p-4 flex flex-col justify-between">
                        <img src={plan.image} alt={plan.title} className="object-cover w-full h-40 rounded-md mb-4" />
                        <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                        <p className="text-sm text-gray-700">{plan.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelPlansComponent;
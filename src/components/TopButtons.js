import React from 'react'


export const TopButtons = ({setQuery}) => {

  const cities = [
    {
      id: 1,
      title: 'Sydney'
    },
    {
      id: 2,
      title: 'Perth'
    },
    {
      id: 3,
      title: 'Tokyo'
    },
    {
      id: 4,
      title: 'Toronto'
    },
    {
      id: 5,
      title: 'Paris'
    },
  ]

  return (
    <div className='flex items-center justify-around my-6'>
      {
        cities.map(object => <button
          className='text-white text-lg font-medium'
          key={object.id}
          onClick={() => setQuery({ q: object.title })}
          >
            {object.title}
          </button>)
      }
    </div>
  )
}
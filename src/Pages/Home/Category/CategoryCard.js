import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { _id, title, categoryImg} = category;
    return (
        <Link to={`/category/${_id}`}
            className=' block sm:flex border-2 border-primary bg-white hover:shadow-2xl m-4 text-center rounded-lg p-6 '
        >
            <img className='w-52 h-60 mx-auto' src={categoryImg} alt="" />
            <h2 className="text-3xl font-bold text-secondary">{title }</h2>
        </Link>
    );
};

export default CategoryCard;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {
    
    const { data: categorys = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            
            const res = await fetch('https://drim-store-server-dvsrshohan.vercel.app/category');
            const data = await res.json();
            return data;
        }
    })
    return (
        <section className="my-12">
            <h2 className="text-3xl text-center mt-6 font-semibold">Second Hand Product Categories</h2>
            <div className="bg-secondary h-1 w-1/6 mx-auto"></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    categorys.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    ></CategoryCard>)
                }
            </div>
        </section>
    );
};

export default Category;
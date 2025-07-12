import React, { useState, useRef } from 'react';
import "./css/ShopCategory.css";
import Button from "../Button"
import all_product from '../components/Assets/all_product';
import Item from '../components/Item/Item';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useGetDataQuery } from '../store/cartSlice';

gsap.registerPlugin(ScrollTrigger);

const ShopCategory = (props) => {

  const CardRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {

    gsap.from(imgRef.current, {
      y: 30,
      opacity: 0,
      delay: 1,
      duration: 0.5,
      stagger: 0.3,
      scrollTrigger: {
        trigger: imgRef.current,
        scroller: "body",
      }
    });

    gsap.from(CardRef.current, {
      y: 40,
      opacity: 0,
      delay: 1,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: CardRef.current,
        scroller: "body",
      }
    });
  });

  const [sortOption, setSortOption] = useState('bestsellers');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { data } = useGetDataQuery();
  console.log("This is the data:",data);

  const sortByClickHandler = (option) => {
    setSortOption(option);
    setDropdownVisible(false);
  };

  const sortDropDownHandler = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const sortOptions = [
    { value: 'bestsellers', label: 'Featured' },
    { value: 'better_discount', label: 'Discount' },
    { value: 'price_low_to_high', label: 'Price low to high' },
    { value: 'price_high_to_low', label: 'Price high to low' },
  ];

  return (
    <section>
      <div>
        <figure className='shop-banner' ref={imgRef}>
          <img src={props.Banner} alt="" />
        </figure>
      </div>
      <div className='mb-10'>
        <div className="sort-by w-full border-t border-gray-300">
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p>
                showing <strong>1</strong> to <strong>10</strong> of <strong>20</strong> results
              </p>
            </div>
            <div className="space-x-2 mt-2">
              <div className="hidden lg:block">
                <div className="flex justify-between items-center">
                  <label className="sort-label text-center">Sort by:</label>
                  <div id="sort" className={`sort-btn-group `}>
                    <Button
                      type="button"
                      className="sort-btn-toggle btn"
                      onClick={sortDropDownHandler}
                    >
                      <span className="sort-label-text font-semibold text-base">{sortOption}</span>
                      <span className="arrowToggle text-black">
                        <span></span>
                        <span></span>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path></svg>
                    </Button>
                    {dropdownVisible && (
                      <div className="sort-price-dropdown bg-white shadow-lg rounded-lg mt-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            value={option.value}
                            onClick={() => sortByClickHandler(option.value)}
                            className={`block w-full text-left px-4 py-2 ${sortOption === option.value ? 'bg-gray-200 font-semibold' : ''}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='shop-category-width flex flex-wrap justify-center' ref={CardRef}>
        {
          all_product.map((item) => (
            item.category === props.category ? (

              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.new_price}
                category={item.category}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              />
            ) : null
          ))
        }
      </div>
    </section>
  )
}

export default ShopCategory

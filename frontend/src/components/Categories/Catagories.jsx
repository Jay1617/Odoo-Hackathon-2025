import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header/Header.css";

const Catagories = ({ isShop, setIsShop }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Shop");

  useEffect(() => {
    if (isShop) {
      setMenu("Shop");
      setIsShop(false);
    }
  }, [isShop, setIsShop]);

  const navItems = [
    {
      name: "Shop",
      slug: "/",
    },
    {
      name: "Men",
      slug: "/men",
    },
    {
      name: "Women",
      slug: "/women",
    },
    {
      name: "Kids",
      slug: "/kids",
    },
    {
      name: "Ask AI",
      slug: "/style-advisor",
    },
  ];
  return (
    <div>
      <ul className="flex ml-auto flex-col sm:flex-row text-center sm:text-left pt-5">
        {navItems.map((item) => (
          <li key={item.name} className="mb-2 sm:mb-0">
            <button
              onClick={() => {
                navigate(item.slug);
                setMenu(item.name);
              }}
              className="inline-block px-6 py-2 duration-200 rounded-full"
            >
              {item.name}
            </button>
            {menu === item.name ? <hr /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catagories;

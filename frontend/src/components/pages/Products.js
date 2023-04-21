import React, { useEffect } from 'react';
import '../styles/products.css';
import save from '../images/save.png';
import banking1 from '../images/banking1.png';
import sales from '../images/sales.png';
import sales1 from '../images/sales.png';
import sales2 from '../images/sales.png';
import payment1 from '../images/payment1.png';

const Products = () => {
  useEffect(() => {
    // Get the container element and create an array with the image sources
    const container = document.getElementById('products-container');
    const images = [save, banking1, sales, sales1, sales2, payment1];

    // Add the images to the container
    images.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'product-img';
      container.appendChild(img);
    });

    // Make the images slide from right to left
    let position = 0;
    const slideInterval = setInterval(() => {
      position -= 1;
      container.style.transform = `translateX(${position}px)`;

      // Reset position once the container has moved past the width of the images
      const containerWidth = container.offsetWidth;
      const imagesWidth = images.length * document.querySelector('.product-img').offsetWidth;
      if (containerWidth + position <= imagesWidth) {
        position = 0;
      }
    }, 10);

    // Clean up the interval on unmount
    return () => clearInterval(slideInterval);
  }, []);

  return <div id="products-container" className="products-container"></div>;
};

export default Products;


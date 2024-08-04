import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles || []); // Handling case where articles might be undefined
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className='text-center'>
        Latest <span className='badge bg-danger'>News</span>
      </h2>
      {articles.map((news, index) => (
        <NewsItem
          key={index}
          title={news.title}
          description={news.description}
          src={news.urlToImage || 'default-image-url.jpg'} // Fallback image if urlToImage is null
          url={news.url}
        />
      ))}
    </div>
  );
};

export default NewsBoard;
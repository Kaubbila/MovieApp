import Global from '../components/global/styles/global';
import React, { useEffect, useState } from 'react';
import NewsList from '../components/News/NewsList';
import XMLParser from 'react-xml-parser';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';

function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://www.finnkino.fi/xml/News/?area=1018');
        const xmlText = await response.text();
        const xml = new XMLParser().parseFromString(xmlText);

        const newsArray = xml.getElementsByTagName('NewsArticle').map((article) => {
          return {
            title: article.getElementsByTagName('Title')[0].value,
            htmlLead: article.getElementsByTagName('HTMLLead')[0].value,
            imageURL: article.getElementsByTagName('ImageURL')[0].value,
            articleURL: article.getElementsByTagName('ArticleURL')[0].value,
          };
        });

        setNewsList(newsArray);
      } catch (error) {
        console.error('Error fetching News:', error);
        setError('An error occurred while fetching News.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  return (
    <div className="Container">
      <Global />
      <Header />
      <div className="content">
        <nav>
          <NavBar />
        </nav>
        <main >
          <NewsList newsList={newsList} />
        </main>
      </div >
    </div>
  );
};

export default News;

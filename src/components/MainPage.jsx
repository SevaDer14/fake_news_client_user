import React, { useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import Articles from '../modules/Articles';
import ArticleCard from './ArticleCard';
import BreakingNews from './layout/BreakingNews';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { error, message, articles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  let articleList = articles.slice(1).map((article, index) => {
    return <ArticleCard article={article} index={index} />;
  });

  return (
    <>
      {error && (
        <Header data-cy='error-message' color='red'>
          {message}
        </Header>
      )}
      <BreakingNews firstArticle={articles[0]} />

      <div id='articles-container' data-cy='articles-container'>
        {articleList}
      </div>
    </>
  );
};

export default MainPage;

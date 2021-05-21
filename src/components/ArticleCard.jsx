import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Label, Icon } from 'semantic-ui-react';
import { setRating } from '../modules/Articles';
import { useSelector } from 'react-redux';

const ArticleCard = ({ article, index }) => {
  const { subscriber } = useSelector((state) => state);
  return (
    <div
      className='card-container box-shadow'
      data-cy={`article-card-${index}`}>
      <Link
        to={
          subscriber
            ? `/articles/${article.id}`
            : article.premium
            ? { pathname: '/registration', state: { redirected: true }}
            : `/articles/${article.id}`
        }>
        <div data-cy='article'>
          {article.premium && (
            <Label data-cy='premium-label' style={styles.label}>
              <Icon name='star' color='yellow' /> Premium
            </Label>
          )}
          <img
            data-cy='image'
            className='card-image'
            src={article.image}
            alt='Article Card attachment'
          />
          <div className='card-content'>
            <h4 className='card-header' data-cy='title'>
              {article.title}
            </h4>
            <p className='card-teaser' data-cy='teaser'>
              {article.teaser}
            </p>
            <Rating
              data-cy='rating'
              defaultRating={setRating(article.rating)}
              maxRating={5}
              disabled
              icon='star'
              size='tiny'
            />
            <p className='card-date' data-cy='created-at'>
              {article.date}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;

const styles = {
  label: {
    backgroundColor: '#333',
    color: 'white',
    position: 'relative',
    top: 0,
    zIndex: 2000,
    width: '100%',
  },
};

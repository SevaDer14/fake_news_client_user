import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Label, Icon } from 'semantic-ui-react';
import { setRating } from '../modules/Articles';
import { useSelector } from 'react-redux';
import _ from 'lodash'


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
            ? { pathname: '/registration', state: { redirected: true } }
            : `/articles/${article.id}`
        }>
        <div data-cy='article' className='card-content-wrapper'>
          {article.premium && (
            <Label data-cy='premium-label' style={styles.label}>
              <Icon name='star' color='black' /> Premium
            </Label>
          )}
          <img
            data-cy='image'
            className='card-image'
            style={{marginTop: article.premium && -25}}
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
            <div>
              <Rating
                data-cy='rating'
                defaultRating={setRating(_.round(article.rating))}
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
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;

const styles = {
  label: {
    backgroundColor: '#ffb74d',
    color: 'black',
    position: 'relative',
    top: 0,
    zIndex: 2000,
    width: '100%',
  },
};

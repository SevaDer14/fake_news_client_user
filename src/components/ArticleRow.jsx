import React from 'react';
import { Link } from 'react-router-dom';
import { setRating } from '../modules/Articles';
import { Rating, Label, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import _ from 'lodash'


const ArticleRow = ({ article }) => {
  const { subscriber } = useSelector((state) => state);
  return (
    <Link
      style={styles.container}
      data-cy='article'
      className='hover'
      to={
        subscriber
          ? `/articles/${article.id}`
          : article.premium
          ? { pathname: '/registration', state: { redirected: true } }
          : `/articles/${article.id}`
      }>
      <div>
        {article.premium && (
          <Label data-cy='premium-label' style={styles.label}>
            <Icon name='star' color='black' /> Premium
          </Label>
        )}
      </div>
      <div style={{ display: 'flex' }}>
        <img style={styles.image} src={article.image} alt={article.title} />
        <div style={styles.contentContainer}>
          <h1 data-cy='title'>{article.title}</h1>
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
  );
};

export default ArticleRow;

const styles = {
  container: {
    display: 'flex',
    marginBottom: 50,
    flexDirection: 'column',
  },
  image: {
    height: 240,
    width: 300,
    objectFit: 'cover',
  },
  contentContainer: {
    color: 'white',
    padding: 25,
  },
  label: {
    backgroundColor: '#ffb74d',
    color: 'black',
    position: 'relative',
    top: 0,
    zIndex: 2000,
  },
};

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Articles, { setRating } from '../modules/Articles';
import { Popup, Rating } from 'semantic-ui-react';
import _ from 'lodash'

const Article = () => {
  const { article, successfulRating, subscriber } = useSelector(
    (state) => state
  );
  const { id } = useParams();

  const articleRating = (event, { rating, maxRating }) => {
    if (subscriber) {
      Articles.ratings(rating, id);
    } else {
      return;
    }
  };

  useEffect(() => {
    Articles.show(id);
  }, [id]);

  return (
    <div data-cy='article-container' className='article-container box-shadow'>
      {article && (
        <>
          <h1 data-cy='article-title' className='article-title'>
            {article.title}
          </h1>

          <p data-cy='article-category' className='article-category'>
            Category: {article.category}
          </p>
          <Popup
            content={
              successfulRating
                ? 'Thank you for your opinion!'
                : subscriber
                ? 'Sorry your vote was not registered'
                : 'You have to subscribe to be able to rate'
            }
            on='click'
            pinned
            popper={{ id: 'rating-message' }}
            hideOnScroll
            trigger={
              <Rating
                onRate={articleRating}
                data-cy='article-rating-button'
                defaultRating={setRating(_.round(article.rating))}
                maxRating={5}
                icon='star'
                size='tiny'
              />
            }
          />
          {article.rating && (
            <span data-cy='article-rating' style={{ fontSize: '1rem' }}>
              {` ${_.round(article.rating, 1)}`}
            </span>
          )}

          <p data-cy='article-author' className='article-author'>
            {article.author &&
              `Written by: ${article.author.first_name} ${article.author.last_name} - `}
            <span data-cy='article-date' className='article-date'>
              {article.date}
            </span>
          </p>
          <img
            data-cy='article-image'
            src={article.image}
            alt='article.attachment'
            style={{
              width: '100%',
              margin: '50px 0',
              height: 500,
              objectFit: 'cover',
            }}
          />
          {article.body &&
            article.body.map((paragraph) => (
              <>
                <p data-cy='article-body' className='article-body'>
                  {paragraph}
                </p>
                <br />
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default Article;

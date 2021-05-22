import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Table, Segment } from 'semantic-ui-react';
import BackyardArticles from '../modules/BackyardArticles';

const BackyardDashboard = () => {
  const { backyardArticles } = useSelector((state) => state);

  const getArticlesBasedOnPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      BackyardArticles.index(position.coords)
    })
  };
  
  useEffect(() => {
    getArticlesBasedOnPosition()
  }, []);

  const listOfBackyardArticles = backyardArticles.map((backyardArticle) => (
    <Table.Row
      key={backyardArticle.id}
      textAlign='center'
      data-cy='backyard-article'>
      <Table.Cell
        data-cy='title'
        textAlign='left'
        width={5}
        style={{ fontWeight: 'bold' }}>
        {backyardArticle.title}
      </Table.Cell>
      <Table.Cell data-cy='theme' singleLine>
        {backyardArticle.theme}
      </Table.Cell>
      <Table.Cell data-cy='author'>
        {backyardArticle.author
          ? `${backyardArticle.author.first_name} ${backyardArticle.author.last_name}`
          : 'Bob Kramer'}
      </Table.Cell>
      <Table.Cell data-cy='date'>{backyardArticle.date}</Table.Cell>
      <Table.Cell>
        <Link
          data-cy='view-backyard-article-btn'
          to={{ pathname: '/view', state: { id: backyardArticle.id } }}>
          <Button>View</Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <div style={styles.container}>
        <div className='box-shadow' style={styles.articleContainer}>
          <Segment inverted attached='top'>
            <h2>All Articles</h2>
          </Segment>
          <Table celled padded inverted style={{ overflowY: 'scroll' }}>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                <Table.HeaderCell>Theme</Table.HeaderCell>
                <Table.HeaderCell>Written by</Table.HeaderCell>
                <Table.HeaderCell>Updated On</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {backyardArticles[0] && (
              <Table.Body>{listOfBackyardArticles}</Table.Body>
            )}
          </Table>
        </div>
      </div>
    </>
  );
};

export default BackyardDashboard;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: '100px 15%',
  },
  articleContainer: {
    backgroundColor: '#202325',
    width: '100%',
  },
  formContainer: {
    width: '45%',
    marginLeft: '5%',
    padding: 10,
  },
  createButton: {
    position: 'absolute',
    top: 105,
    left: 300,
  },
};

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { listAll, remove } from '../services/itemServices';
import history from '../utils/history';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Items = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    listAll().then(({items}) => {
      setItems(items);
    });
  }, []);

  const onRemoveItem = (itemId)  => {
    remove(itemId).then(() => {
      setItems(items.filter(it => it.itemId !== itemId));
    });
  }

  return(
    <>
      <Row>
        <Col>
          <h1>Items</h1>
        </Col>
      </Row>

      <Row>
        <Col className="text-right">
          <Button 
            variant="secondary" 
            onClick={() => history.push('/items-form') }>
              Add new Item
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table hover striped bordered>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                items.map(item => (
                  <tr key={item.itemId}>
                    <td></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <Link to={`/items-form/${item.itemId}`} >Edit</Link>
                    </td>
                    <td>
                      <Button 
                        type="button"
                        variant="danger"
                        onClick={() => onRemoveItem(item.itemId)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              }
              
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default Items;
import React, {useState, useEffect} from 'react';
import { listAll, addNew, remove } from '../services/categoryServices';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Category = () => {

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    listAll().then(({items}) => setCategories(items));
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    
    if( categoryName === "") {
      return;
    }
    
    addNew({name: categoryName}).then(resp => {
      setCategoryName("");
      setCategories([...categories, resp.item]);
    });
  };

  const onCategoryRemove = (id) => {
    remove(id).then(() => {
      const newCategories = categories.filter(cat => cat.categoryId !== id);
      setCategories(newCategories);
    });
  }


  return (
    <>
      <Row>
        <Col>
          <h1>Categories</h1>
        </Col>
      </Row>

      <Form onSubmit={onFormSubmit}>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter category name"
                aria-label="Enter category name"
                aria-describedby="basic-addon2"
                value={categoryName}
                onChange={e => {setCategoryName(e.target.value)}}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Add</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>See items</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                categories.map(category => (
                  <tr key={category.categoryId}>
                    <td>{category.name}</td>
                    <td></td>
                    <td>
                      <button onClick={() => onCategoryRemove(category.categoryId)}>
                        Remove
                      </button>
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

export default Category;
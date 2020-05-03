import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import history from '../utils/history';
import { listAll as listAllServices } from '../services/categoryServices';
import { addNew, getById, update, getSignedUrl, updatePhoto } from '../services/itemServices';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ItemsForm = () => {

  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    categoryId: "0",
    createdAt: "",
    itemId: "",
    name: "",
    photo: "",
    price: "",
    restaurantId: "",
  });
  const [file, setFile] = useState("");  

  useEffect(() => {
    listAllServices().then(({items}) => {
      setCategories(items);
      setItem({...item})
    });
  }, []);

  useEffect(() => {
    console.log('itemId', id);
    if(id){
      getById(id).then((resp) => setItem({...resp.item, photo:''}));
    }
  }, [id]);

  const onFormSubmit = (e) => {
    e.preventDefault();
   


    if(id){
      update(id, item).then(() => {       
        if(!file){
          return alert('Updated');
        }
        getSignedUrl(item.itemId).then(({uploadUrl}) => {
          updatePhoto(uploadUrl, file).then(() => {
            alert('Updated');
          });        
        });
      });

    }else{
      addNew(item).then(() => history.push('/items'));
      
    }
  }

  return(
    <>
      <Row>
        <Col>
          <h1>New Item</h1>
        </Col>
      </Row>

      <Form onSubmit={onFormSubmit}>
        <Row>
          <Col>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Coke 350ml"
                    value={item.name}
                    onChange={e => setItem({...item, name: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <NumberFormat
                    placeholder="$ 1.50" 
                    value={item.price}
                    thousandSeparator={true}
                    onChange={e => setItem({...item, price: e.target.value})}
                    prefix={'$'} 
                    className="form-control"
                    />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={item.categoryId} onChange={(e) => setItem({...item, categoryId:e.target.value})}>
                      <option value="0">Uncategorized</option>
                      {
                        categories.map(cat => (
                          <option key={cat.categoryId} value={cat.categoryId} >{ cat.name }</option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="text-left">
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={() => history.push('/items')}>Cancel</Button>
              </Col>
              <Col className="text-right">
                <Button type="submit">Save</Button>
              </Col>
            </Row>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control 
                type="file" 
                value={item.photo}
                accept="image/*"
                onChange={e => {
                  setItem({...item, photo: e.target.value});
                  console.log(e.target.files[0]);                  
                  setFile(e.target.files[0]);
                }} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ItemsForm;
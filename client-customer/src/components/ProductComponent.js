import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div>
        <div className="text-center">
          <h2 className="text-center">LIST PRODUCTS</h2>
          {prods}
        </div>
        <footer>
            <div className='float-right'>
              <img className='bottom-logo' src="https://i.imgur.com/ETLpo1l.png" alt=""></img>
              <h4>Terms & Conditions</h4>
            </div>
            <div className='float-left'>
              <h1>More new products from us</h1>
              <h4>Transforming spaces is an art, and we appreciate the trust<br></br> you've placed in us to bring your vision to life.<br></br> As we meticulously craft every corner, we want to remind<br></br> you to take care of your newly designed interior oasis.</h4>              
              <h4>Copyright © 2023 Lux Design. All Rights Reserved.</h4>
            </div>
            <div className='bottom-center'>
              <h1>Contact us</h1>
              <h4>CUSTOMER SERVICE:<br></br> +33 1 40 22 14 14</h4>
              <div>
                <li className='bottom'>
                  <a href="https://www.facebook.com/thaicong"><img className='icon' src="https://i.imgur.com/ebNza1q.png" alt=""></img></a>
                  <a href="https://www.instagram.com/thaicong_official/"><img className='icon' src="https://i.imgur.com/6dGqhRc.png" alt=""></img></a>
                  <a href="https://www.youtube.com/@ThaiCongTV"><img className='icon' src="https://i.imgur.com/OnJ3Jpl.png" alt=""></img></a>
                </li>
              </div>
            </div>
          </footer>
    </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);
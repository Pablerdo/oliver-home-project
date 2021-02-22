import React from 'react';
import '../Styles/Home.scss';
import axios from 'axios';
import {Grid, Header, Card, Rating} from 'semantic-ui-react'
import Add from './Add.js'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      givenProduct: 0,
      products: [],
      loading: true,
      reviews: [],
    };
    this.getReviews = this.getReviews.bind(this)
  }

  componentDidMount(){
    this.getProducts()
    this.getReviews()
  }



  async getProducts() {
    const response = await axios.get('http://localhost:3004/products')
    const { data } = await response
    this.setState({
      products: data,
      loading: false,
    })
  }

  async getReviews() {
    const response = await axios.get('http://localhost:3004/reviews')
    const { data } = await response

    this.setState({
      reviews: data
    })
  }

  render() {
    
    let {products, loading, givenProduct, reviews} = this.state;
    if (loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
        <Grid stackable style={{height: "100vh"}}>
          <Grid.Column width={4} >
            <Header style={{margin: 20, fontSize: 70}} >
              Products
            </Header>
            {products.map(product => (
              <Card style={{padding: 10, margin: 20, backgroundColor: parseInt(product.id) === givenProduct ? '#ffe82f' : 'white', border: '3px solid #262223'}} onClick={() => this.setState({givenProduct: product.id})}>
                <Card.Content>
                  <Card.Header style={{color: 'black', fontSize: 25}}>
                    {product.name}
                  </Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>

          <Grid.Column width={11} style={{backgroundColor: '#fff', borderLeft: '4px solid #262223'}}>
            <Header style={{margin: 20, fontSize: 70}} floated='left'>
              Reviews 
            </Header>
            <Add givenProduct={givenProduct} floated='right' onSubmit={this.getReviews}/>

            {reviews.filter(review => parseInt(review.productId) === givenProduct).map(review => (
              <Card fluid style={{paddingBottom: 10, marginLeft: 20, backgroundColor: '#ffe82f', border: '3px solid #262223'}} color={"#ffe82f"}>
                <Card.Content>
                  <Card.Header style={{fontSize: 45}}>
                    {review.headline}
                  </Card.Header>
                  <Card.Meta style={{fontSize: 30, marginBottom: 10}}>
                    {review.author}
                  </Card.Meta>
                  <Rating icon='heart' style={{marginBottom: 10}} disabled defaultRating={review.star_rating} maxRating={5} />

                  <Card.Description style={{fontSize: 30, lineHeight: 1}}>
                    {review.body}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid>
      );
  }
}

export default Home;

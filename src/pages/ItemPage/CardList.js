import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'

const CardList = ({ item, handleDeleteItem }) => {

  return (

    <div className='col-sm-4 mb-5' >
      <Card
        style={{
          width: '14rem'
        }}
      >
        <img
          alt="Sample"
          src={item.photo}
        />
        <CardBody>
          <CardTitle tag="h5">
            {item.code} {item.name}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Stock : {item.stock}
          </CardSubtitle>
          <CardText>
            {item.description}
          </CardText>
          <Button color='danger' onClick={() => handleDeleteItem(item.id)} >
            <i className="fa fa-trash"></i>
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default CardList
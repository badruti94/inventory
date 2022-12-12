import { Card, CardBody } from 'reactstrap'

const CardList = ({ data }) => {
    return (
        <Card
            className='mx-auto mb-2'
        >
            <CardBody>
                {data.name} &nbsp;
                {data.date} No. Bukti : {data.proof_code} &nbsp;
                Masuk :  {data.type === 'in' ? data.stock : '-'} &nbsp;
                Keluar :  {data.type === 'out' ? data.stock : '-'}
            </CardBody>
        </Card>
    )
}

export default CardList
import { useEffect, useState } from 'react'
import Template from '../../components/Template'
import CardList from './CardList'
import { API, getConfig } from '../../config/api'
import { useNavigate } from 'react-router-dom'
import { SwalConfirm, SwalFire } from '../../utils/SwalFire'
import { Button, Card, CardBody } from 'reactstrap'


const ItemPage = () => {
    const [items, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const config = await getConfig()
            const itemData = await API.get('/items', config)

            setItem(itemData.data.data.items)
            setIsLoading(false)
        } catch (error) {
            SwalFire('error', error.response.data.message + '. Silahkan refresh halaman atau login kembali')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDeleteItem = async (id) => {
        const deleteItem = async () => {
            try {
                const config = await getConfig()
                await API.delete(`/items/${id}`, config)
                getData()
            } catch (error) {
                SwalFire('error', error.response.data.message)
            }
        }
        SwalConfirm(deleteItem, 'Item telah dihapus')
    }


    return (
        <Template>
            <div
                className="cardlist-wrapper mx-auto"
                style={{ marginBottom: 500, width: '70%' }}
            >
                <Button
                    color='primary'
                    className='mb-4'
                    onClick={() => navigate('/item/create')}
                >
                    <i className="fa fa-plus"></i> Tambah Item
                </Button>
                {isLoading &&
                    <Card className='mx-auto mb-4' >
                        <CardBody>
                            Loading....
                        </CardBody>
                    </Card>}

                <div className='row' >
                    {items && items.map(item =>
                        <CardList
                            key={item.id}
                            item={item}
                            handleDeleteItem={handleDeleteItem}
                        />
                    )}
                </div>
            </div>
        </Template>
    )
}

export default ItemPage
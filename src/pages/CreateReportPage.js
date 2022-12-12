import { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { Button, Card, CardBody, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Template from '../components/Template'
import { API, getConfig } from '../config/api'
import { SwalFire } from '../utils/SwalFire'


const CreateReportPage = () => {
    const navigate = useNavigate()
    const [dataForm, setDataForm] = useState({
        proof_code: '',
        stock: null,
    })
    const [itemId, setItemId] = useState()
    const [type, setType] = useState('in')
    const [items, setItems] = useState([])

    const getItem = async () => {
        try {
            const config = await getConfig()
            const itemData = await API.get('/items', config)

            setItems(itemData.data.data.items)
        } catch (error) {
            SwalFire('error', error.response.data.message + '. Silahkan refresh halaman atau login kembali')
        }
    }
    useEffect(() => {
        getItem()
    }, [])

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const config = await getConfig()
            const result = await API.post(`items/${itemId}/${type}`, dataForm, config)

            SwalFire('success', result.data.message)
            navigate('/report')
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    return (
        <Template>
            <Card className='mx-auto' style={{ width: '70%', marginBottom: '10rem' }} >
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="proof_code">
                                Barang
                            </Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={items.map(item => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                                onChange={e => setItemId(e.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="proof_code">
                                Type
                            </Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={{
                                    value: 'in',
                                    label: 'Barang Masuk',
                                }}
                                isDisabled={false}
                                isLoading={false}
                                isRtl={false}
                                isSearchable={false}
                                name="color"
                                options={[
                                    {
                                        value: 'in',
                                        label: 'Barang Masuk',
                                    },
                                    {
                                        value: 'out',
                                        label: 'Barang Keluar',
                                    },
                                ]}
                                onChange={e => setType(e.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="proof_code">
                                Kode Bukti
                            </Label>
                            <Input
                                id="proof_code"
                                name="proof_code"
                                type="text"
                                value={dataForm.proof_code}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="stock">
                                Stock
                            </Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={dataForm.stock}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button type='submit' >
                            Tambah
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Template>
    )
}

export default CreateReportPage
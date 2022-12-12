import { useState } from 'react'
import { Form } from 'react-router-dom'
import { Button, Card, CardBody, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Template from '../components/Template'
import { API, getConfig } from '../config/api'
import { SwalFire } from '../utils/SwalFire'


const CreateItemPage = () => {
    const navigate = useNavigate()
    const [dataForm, setDataForm] = useState({
        code: '',
        name: '',
        description: '',
        stock: null,
        photo: '',
    })

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const config = await getConfig()

            const formData = new FormData()
            formData.set('code', dataForm.code)
            formData.set('name', dataForm.name)
            formData.set('description', dataForm.description)
            formData.set('stock', dataForm.stock)
            if (dataForm.photo !== "" && dataForm.photo !== null) {
                formData.set("photo", dataForm.photo[0], dataForm.photo[0].name);
            }
            const result = await API.post('/items', formData, config)

            SwalFire('success', result.data.message)

            navigate('/item')
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    return (
        <Template>
            <Card className='mx-auto' style={{ width: '70%' }} >
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="code">
                                Kode Barang
                            </Label>
                            <Input
                                id="code"
                                name="code"
                                type="text"
                                value={dataForm.code}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">
                                Nama Barang
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={dataForm.name}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">
                                Deskripsi
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                type="textarea"
                                rows={3}
                                value={dataForm.description}
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
                        <FormGroup>
                            <Label for="photo">
                                Photo
                            </Label>
                            <Input
                                id="photo"
                                name="photo"
                                type="file"
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

export default CreateItemPage
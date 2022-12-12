import { useEffect, useState, useRef } from 'react'
import Select from 'react-select'
import Template from '../../components/Template'
import CardList from './CardList'
import { API, getConfig } from '../../config/api'
import { useNavigate } from 'react-router-dom'
import { SwalFire } from '../../utils/SwalFire'
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import { ComponentToPrint } from '../ComponentToPrint'


const ReportPage = () => {
    const [report, setReport] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const componentRef = useRef();
    const [dataForm, setDataForm] = useState({
        month: moment().format("MM"),
        year: moment().format("YYYY"),
    })

    const months = [
        { label: 'Januari', value: '01' },
        { label: 'Februari', value: '02' },
        { label: 'Maret', value: '03' },
        { label: 'April', value: '04' },
        { label: 'Mei', value: '05' },
        { label: 'Juni', value: '06' },
        { label: 'July', value: '07' },
        { label: 'Agustus', value: '08' },
        { label: 'September', value: '09' },
        { label: 'Oktober', value: '10' },
        { label: 'November', value: '11' },
        { label: 'Desember', value: '12' },
    ]

    const years = []
    for (let i = 2001; i <= 2100; i++) {
        years.push({
            label: i.toString(),
            value: i.toString(),
        })
    }


    const getData = async () => {
        try {
            const config = await getConfig()
            const reportData = await API.get(`reports?month=${dataForm.month}&year=${dataForm.year}`, config)

            setReport(reportData.data.data.report)
            setIsLoading(false)
        } catch (error) {
            SwalFire('error', error.response.data.message + '. Silahkan refresh halaman atau login kembali')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const handleFilter = () => {
        getData()
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
                    onClick={() => navigate('/report/create')}
                >
                    <i className="fa fa-plus"></i> Tambah Data
                </Button>
                <Card className='mx-auto' style={{ marginBottom: '4rem' }} >
                    <CardBody>
                        <Form>
                            <Row style={{ width: '100%' }} >
                                <Col md={4}>
                                    <FormGroup>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isDisabled={false}
                                            isLoading={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="year"
                                            options={years}
                                            placeholder='Tahun'
                                            onChange={e => {
                                                setDataForm({
                                                    ...dataForm,
                                                    year: e.value,
                                                })
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            placeholder='Bulan'
                                            isDisabled={false}
                                            isLoading={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="month"
                                            options={months}
                                            onChange={e => {
                                                setDataForm({
                                                    ...dataForm,
                                                    month: e.value,
                                                })
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <Button color='primary' type='submit' onClick={handleFilter}>
                                        Filter
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button color='danger' type='submit' onClick={handlePrint}>
                                        <i className="fa fa-file-pdf"></i> Export
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
                {isLoading &&
                    <Card className='mx-auto mb-4' >
                        <CardBody>
                            Loading....
                        </CardBody>
                    </Card>}

                <div className='row' >
                    {report && report.map(data =>
                        <CardList
                            key={data.id}
                            data={data}
                        />
                    )}
                </div>
            </div>
            <div style={{ display: '' }} >
                <ComponentToPrint report={report} ref={componentRef} />
            </div>
        </Template>
    )
}

export default ReportPage
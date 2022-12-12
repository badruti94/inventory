import React from 'react'

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className='p-3'>
            <div className='text-center mb-4' >
                <div>KARTU STOCK</div>
                <div>bulan Januari 2019</div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Nama Barang</th>
                        <th>No Bukti</th>
                        <th>Masuk</th>
                        <th>Keluar</th>
                        <th>Stok Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    {props.report && props.report.map((data, i) => (<tr>
                        <th>{i + 1}</th>
                        <th>{data.date}</th>
                        <th>{data.name}</th>
                        <th>{data.proof_code}</th>
                        <th>{data.type === 'in' ? data.stock : '-'}</th>
                        <th>{data.type === 'out' ? data.stock : '-'}</th>
                        <th>{data.stock_after}</th>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
});
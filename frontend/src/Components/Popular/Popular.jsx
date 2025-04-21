import React, { useEffect } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'

const Popular = (props) => {
    const [selected, setSelected] = React.useState(null)
    const [data, setData] = React.useState(props.data.products)
    const [category, setCategory] = React.useState(props.data.subcategory)

    useEffect(() => {
        if (selected === null) {
            setData(props.data.products)
        }else {
            setData(props.data.subcategory[selected].products)
        }
    }, [selected, data])


    return (
        <div className='popular'>
            <div className='popular-header'>
                <Link to={`/shop/${props.data.slug}`} onClick={() => { setSelected(null) }} style={{ textDecoration: 'none' }}>
                    <h1>
                        {props.data.title}
                    </h1>
                </Link>
                <ul className='popular-category'>
                    {category.map((item, index) => {
                        return <li key={index} onClick={() => { setSelected(index) }} className={selected === index ? 'active' : ''}>
                           {item.name}
                        </li>
                    })}
                </ul>
            </div>
            <div className="popular-item">
                {data.map((item, index) => {
                    return <Item id={item.id} key={index} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} colors={item.colors} />
                })}
            </div>
        </div>
    )
}

export default Popular

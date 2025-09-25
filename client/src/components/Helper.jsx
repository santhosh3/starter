import { Link } from 'react-router-dom';

function Helper({ data }) {
    return (
        <p className="alpha">{
            data.isoAlpha3.slice(0, 5).map((id, index) => (
                <Link to={`../alpha3Code/${id}`} key={index}>
                    {id}
                </Link>
            ))
            
        }
        </p>
    )
}

export default Helper
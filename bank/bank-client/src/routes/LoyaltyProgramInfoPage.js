import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Utils from '../utils/utils';
import loyaltyPrograms_service from '../services/loyaltyPrograms_service';

/**
 * LoyaltyProgramInfoPage - Displays loyalty program data for a single loyalty program
 */
const LoyaltyProgramInfoPage = () => {
    const [loyaltyProgram, setLoyaltyProgram] = useState(undefined);
    const [searchParams, setSearchParams] = useSearchParams();
    const loyaltyProgramId = searchParams.get("loyaltyProgramId") || "";

    useEffect(() => {
        loyaltyPrograms_service.programs_getProgramById(loyaltyProgramId)
        .then(loyaltyProgram => {
            setLoyaltyProgram(loyaltyProgram);
        })
        .catch(err => {
            console.error("LoyaltyProgramInfoPage Error: ", err);
            setLoyaltyProgram({});
        })
    }, []);

    
    // Return HTML
    if (typeof loyaltyProgram === 'undefined')
        return (<h1>Loading...</h1>);
    if (Utils.isEmptyObject(loyaltyProgram))
        return (<h1>No such loyalty program</h1>);
    return (
        <>
            <img className="wave" src='/images/wave.png' />
            <div className='container'>
                <div className='img'>
                    <img src='/images/points.svg' alt="Information" />
                </div>
                <div className='container2'>
                    <div className='container3'>
                        <a href={`${loyaltyProgram.href}`}>
                            <img className='avatar' src={`${loyaltyProgram.imgSrc}`} alt=''/>
                        </a>
                        <h3>{loyaltyProgram.loyaltyProgramName}</h3>
                        <p>{loyaltyProgram.description}</p>

                        <Link className='btn' to={{pathname: '/loyalty_programs/membership', search: `?loyaltyProgramId=${loyaltyProgramId}`}}>Edit Membership</Link>
                        <Link className='btn' to={{pathname: `/transfers/make_transfer`, search: `?loyaltyProgramId=${loyaltyProgram.loyaltyProgramId}`}}>Transfer Points</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoyaltyProgramInfoPage;
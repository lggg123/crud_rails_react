import React, {useState, useEffect, Fragment } from 'react' 
import { useParams } from 'react-router-dom' 
import axios from 'axios'
import Header from './Header'
import Review from './Review'
import ReviewForm from './ReviewForm'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin: 0 auto 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;

    &:last-child {
        background: #000;
    }
`

const Main = styled.div`
    padding-left: 50px;
`

const Airline = (props) => {
    const [airline, setAirline] = useState({})
    const [review, setReview] = useState({})
    const [loaded, setLoaded] = useState(false)
    let { slug } = useParams() 

    useEffect(() => {
        const url = `/api/v1/airlines/${slug}`
        axios.get(url)
        .then( resp => {
            setAirline(resp.data)
            console.log('airline', resp.data)
            setLoaded(true)
        })
        .catch( resp => console.log(resp))
        // api/v1/airlines/united-airlines
        // airlines/united-airlines 
    }, [])

    const handleChange = (e) => {
        e.preventDefault()

        setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))

        console.log('review:', review)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content 
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken 

        const airline_id = parseInt(airline.data.id)
        axios.post('/api/v1/reviews', {...review, airline_id})
        .then(resp => {
            const included = [ ...airline.included, resp.data.data ]

            setAirline({ ...airline, included })
            setReview({title: '', description: '', score: 0 })
        })
        .catch(resp => console.log(resp))
    }

    // set score 
    const setRating = (score, e) => {
        e.preventDefault()
        setReview({ ...review, score })
    }

    // So this basically makes reviews undefined then 
    // if there is data then basically lets build a list of reviews
    let reviews 
    if (loaded && airline.included) {
        reviews = airline.included.map ( (item, index) => {
             return (
                 <Review 
                    key={index}
                    attributes={item.attributes}
                />
             )
         })
    }

    return (
        <Wrapper>
            {
                loaded && 
            <Fragment>
                <Column>
                    <Main>
                        <Header 
                            attributes={airline.data.attributes}
                            review={airline.included}
                        />
                        {reviews}
                    </Main>
                </Column>
                <Column>
                    <ReviewForm 
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setRating={setRating}
                        attributes={airline.data.attributes}
                        review={review}
                    />
                </Column>
            </Fragment>
            }
        </Wrapper>
    )
}

export default Airline; 
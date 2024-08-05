import { useEffect, useState } from "react"


function Load() {
    const [cards, setCards] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    async function fetchCards() {
        try {
            const res = await fetch("https://dummyjson.com/products?limit=20&skip=10");
            const data = await res.json();
            console.log(data.products)
            if (data) {
                setCards(data.products);
            }
        } catch (e) {
            setErrorMsg(e.message)
        }

    }

    useEffect(() => {
        fetchCards()
    }, [])
    return (
        <div className="container d-flex flex-wrap gap-1">
            {errorMsg && <p>{ errorMsg }</p>}
            {
                cards && cards.length > 0 ? (
                    cards.map((item) => (
                        <div key={item.id} className="card" style={{width:"12rem"}}>
                            <img src={item.images} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <p className="card-text text-center">{ item.title }</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No data fetched</div>
                )
            }
        </div>
    )
}

export default Load
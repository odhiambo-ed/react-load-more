import { useEffect, useState } from "react"


function Load() {
    const [cards, setCards] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [visible, setVisible] = useState(6)

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

    const handleVisible = () => {
        setVisible(cards && cards.length >= 6 ? visible + 6 : 6)
    }

    return (
      <div className="container py-5 vh-100">
        <div className="d-flex flex-wrap gap-1 justify-content-center">
          {errorMsg && <p>{errorMsg}</p>}
          {cards && cards.length > 0 ? (
            cards.slice(0, visible).map((item) => (
              <div key={item.id} className="card" style={{ width: "12rem" }}>
                <img
                  src={item.images}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <p className="card-text text-center">{item.title}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No data fetched</div>
          )}
            </div>
            <div className="row justify-content-center mt-5">
                <div onClick={handleVisible} className="btn btn-primary w-75">Load More ..</div>
            </div>
      </div>
    );
}

export default Load
export default defineEventHandler((event) => {
    const query = getQuery(event)
    const originStation = query.originStation
    const data = $fetch(
        "https://pleasantly-easy-rat.ngrok-free.app/items/box",
        {
            // params: {q: originStation, language: 'pl'},
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "x-requested-with": "XMLHttpRequest",
                'ngrok-skip-browser-warning': 'bruno'
            },
        }
    );
    return data;
})
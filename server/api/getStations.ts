export default defineEventHandler((event) => {
    const query = getQuery(event)
    const originStation = query.originStation
    const data = $fetch(
        "http://koleo.pl/ls",
        {
            params: {q: originStation, language: 'pl'},
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "x-requested-with": "XMLHttpRequest",
            },
        }
    );
    return data;
})
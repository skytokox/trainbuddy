export default defineEventHandler((event) => {
    const query = getQuery(event)
    const originStation = query.originStation
    const data = $fetch(
        "https://koleo.pl/api/v2/main/stations",
        {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "x-requested-with": "XMLHttpRequest",
                "x-koleo-version": "2",
            },
        }
    );
    return data;
})
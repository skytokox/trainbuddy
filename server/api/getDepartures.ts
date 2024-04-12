import moment from "moment";

export default defineEventHandler(async (event) => {
    interface connection {
        "arrival": string,
        "departure": string,
        "stations": [
            {
                "id": number,
                "train_id": number,
                "slug": string,
                "name": string
            }
        ],
        "train_full_name": string,
        "brand_id": number,
        "platform": string,
        "track": string
    }

    const query = getQuery(event)
    const stationId = query.stationId
    const date = moment().format("YYYY-MM-DD")
    const brands = await $fetch("https://koleo.pl/api/v2/main/brands",
        {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "x-requested-with": "XMLHttpRequest",
                "x-koleo-version": "2",
            },
        }
    )
    const usefulData = $fetch(
        `https://koleo.pl/api/v2/main/timetables/${stationId}/${date}/departures`,
        {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "x-requested-with": "XMLHttpRequest",
                "x-koleo-version": "2",
            },
        }
    ).then((response) => {
        const destinations: Array<{
            slug_name: string,
            label: string,
            connections: Array<{
                train: string,
                train_brand: string,
                departure: {
                    full: string,
                    hour: string,
                    minute: string,
                }
            }>
        }> = []
        response.forEach((connection: connection) => {
            const date = moment(connection.departure, 'YYYY-MM-DDTHH:mm:ss.SSS')
            if (destinations.find((obj) => obj.slug_name === connection.stations[0].slug)) {
                destinations[destinations.findIndex((obj) => obj.slug_name === connection.stations[0].slug)].connections.push(
                    {
                        train: connection.train_full_name,
                        train_brand: brands.find((brand) => brand.id === connection.brand_id),
                        departure: {
                            full: connection.departure,
                            hour: date.hours().toString(),
                            minute: date.minutes() < 10
                                ? '0' + date.minutes().toString()
                                : date.minutes().toString()
                        }
                    }
                )
            } else {
                destinations.push(
                    {
                        slug_name: connection.stations[0].slug,
                        label: connection.stations[0].name,
                        connections: [
                            {
                                train: connection.train_full_name,
                                train_brand: brands.find((brand) => brand.id === connection.brand_id),
                                departure: {
                                    full: connection.departure,
                                    hour: date.hours().toString(),
                                    minute: date.minutes() < 10
                                        ? '0' + date.minutes().toString()
                                        : date.minutes().toString()
                                }
                            }
                        ]
                    }
                )
            }
        })
        return destinations
    })
    return usefulData;
})
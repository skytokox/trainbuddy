import moment from "moment";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const originStation = query.originStation.toString().toLowerCase()
    const destinationStation = query.destinationStation.toString().toLowerCase()
    const user_date = moment(query.user_date)
    interface koleoData {
        "days": Array<object>,
        "connections": Array<{
            id: number,
            train_ids: Array<number>,
            start_date: {
                'full': string,
                'hour': string,
                'minute': string,
            },
            finish_date: {
                'full': string,
                'hour': string,
                'minute': string,
            }
        }>
        "trains": Array<object>,
        "stops": Array<{
            train_id: number,
            stops: Array<object>
        }>,
    }
    async function getData(): Promise<koleoData> {
        const dateNow = moment().add(30, 'minutes')
        const date = user_date ? user_date.add(30, 'minutes').format("DD-MM-YYYY HH:mm:00") : dateNow.format("DD-MM-YYYY HH:mm:00")
        console.log(date)
        return $fetch(
            "https://koleo.pl/pl/connections",
            {
                params: {
                    'query[brand_ids][]':
                        [ '6',
                            '51',
                            '2',
                            '29',
                            '28',
                            '4',
                            '10',
                            '58',
                            '14',
                            '33',
                            '57',
                            '11',
                            '12',
                            '54',
                            '47',
                            '13',
                            '46',
                            '43',
                            '49',
                            '3',
                            '9',
                            '27',
                            '38',
                            '20',
                            '18',
                            '48',
                            '1',
                            '53',
                            '8' ],
                    'query[date]': date,
                    'query[end_station]': destinationStation,
                    'query[only_direct]': 'false',
                    'query[only_purchasable]': 'false',
                    'query[start_station]': originStation,
                },
                "headers": {
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "x-requested-with": "XMLHttpRequest",
                },
            }
        );
    }

    const data = getData()
    let usefulData: Array<koleoData> = await data.then((result) => {
        const connections = result.connections
        const stops = result.stops
        const temp: any[] | PromiseLike<any[]> = []
        connections.forEach((connection) => {
            const start_date = moment(connection.start_date, 'hh:mm:ss YYYY-MM-DD')
            const end_date = moment(connection.finish_date, 'hh:mm:ss YYYY-MM-DD')
            const connectionData = {
                "id": connection.id,
                "train_ids": connection.train_ids,
                "start_date": {
                    'full': connection.start_date,
                    'hour': start_date.hours() < 10 ? '0' + start_date.hours().toString() : start_date.hours().toString(),
                    'minutes': start_date.minutes() < 10 ? '0' + start_date.minutes().toString() : start_date.minutes().toString(),
                },
                "end_date": {
                    'full': connection.finish_date,
                    'hour': end_date.hours() < 10 ? '0' + end_date.hours().toString() : end_date.hours().toString(),
                    'minutes': end_date.minutes() < 10 ? '0' + end_date.minutes().toString() : end_date.minutes().toString(),
                },
                "stops": stops.filter((stop) => connection.train_ids.includes(stop.train_id))
            }
            temp.push(connectionData)
        })
        return temp
    })
    return usefulData
})
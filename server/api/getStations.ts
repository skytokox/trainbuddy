export default defineEventHandler((event) => {
    const query = getQuery(event)
    const originStation = query.originStation
    // const data = $fetch(`https://koleo.pl/ls?q=${originStation}&language=pl`, {
    //     "headers": {
    //         "accept": "application/json, text/javascript, */*; q=0.01",
    //         "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
    //         "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Opera GX\";v=\"107\", \"Chromium\";v=\"121\"",
    //         "sec-ch-ua-mobile": "?1",
    //         "sec-ch-ua-platform": "\"Android\"",
    //         "sec-fetch-dest": "empty",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "same-origin",
    //         "x-csrf-token": "jC3oLp64pzvewayo1M5UG/KrqO1B6TZhbgStphEtQPCMgGNPBH2Ml/iN+r0S+xOtE1yKNxjBiYDuyj+qzkJzbg==",
    //         "x-requested-with": "XMLHttpRequest",
    //         "cookie": "PID=p210; _koleo_session=N2NhSmJMQ21UQkJBYkppbFhhYVhPOUludDJwSFJSazJMcVROcHhjbUtHSDlEQ1puNXBYRVVXN21GaW9LUE5pYWdDSytVd3YyUkFIRXVKQi81WmViUUtDendZNG5QVHowcThEVCtwdmdWa01wdDIrdjNiOXZ1OEcvZ284TExKMzdoNFlmTFNmV3lCeGxvUjZsSzlHZGdnPT0tLTloNGkzQ2RDei9FclRSOUZocWRDaGc9PQ%3D%3D--d35a5d1cdfc0f57698b2ae3cb0f195eda38866ec",
    //         "Referer": "https://koleo.pl/",
    //         "Referrer-Policy": "strict-origin-when-cross-origin"
    //     },
    //     "body": null,
    //     "method": "GET"
    // });
    // https://koleo.pl/ls?q=${originStation}&language=pl
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
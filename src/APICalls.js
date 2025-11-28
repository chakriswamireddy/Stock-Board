
export const apiBaseUrl = "https://6925935e82b59600d724340f.mockapi.io/stocks";

const fetchData = async (endpoint, method) => {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json() || [];
    }
    catch (error) {
        console.log("Error fetching data:", error);
        return [];
    }

};
 

export const searchStocks = (query) =>
    fetchData(`${query? `q=${query}` : ""} `, "GET");


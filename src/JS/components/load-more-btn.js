export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
    }


    fetchArticles() {
        console.log(this);
        const options = {
            headers: {
                Authorization: '4330ebfabc654a6992c2aa792f3173a3',
            },
        };
        const url = 'http://newsapi.org/v2/everything?q=${this.searchQuery}&language=en&pageSize=5&p';
    
        fetch(url, options)
        .then(r => r.json())
        .then(console.log);
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
    }
